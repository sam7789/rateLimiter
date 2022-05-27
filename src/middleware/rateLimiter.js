const getUnixNow = require("../extra/getUnixNow");
/**
 * Memory storage to track ip addreses
 */
const memory = [];
let limit = 10;
let per = 60;
const getRemainingTime = (per, lastReqUnix) =>
  Math.abs(getUnixNow() - (lastReqUnix + per));

const rateLimiter = () => {
  return async (req, res, next) => {
    const ip = req.ip;
    const existingIp = memory.findIndex((v) => v.ip === ip);
    if (existingIp !== -1) {
      // This means Ip exists in memory db
      memory[existingIp].reqCount += 1;
      const currentTime = getUnixNow();
      /** reqTime is last request's timestamp. */
      if (memory[existingIp].reqTime + per > currentTime) {
        // means the ip is under surveilance (comes under per limit factor)
        if (memory[existingIp].reqCount > limit) {
          return res.status(429).json({
            message: `Too many requests. Please try after ${getRemainingTime(
              per,
              memory[existingIp].reqTime
            )} seconds.`,
          });
        } else {
          // comes under surveilance with under the limit and no cooldown time
          memory[existingIp].reqTime = getUnixNow();
          next();
        }
      } else {
        // cooldown is over now
        memory[existingIp].reqCount = 1;
        memory[existingIp].reqTime = getUnixNow();
        next();
      }
    } else {
      // this is a new ip
      memory.push({ ip, reqCount: 1, reqTime: getUnixNow() });
      next();
    }
  };
};

module.exports = rateLimiter;
