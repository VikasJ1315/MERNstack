import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip || "global";
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests,please slow down." });
    }
    next();
  } catch (error) {
    console.error("Rate Limiter Error:", error);
    // Default to allowing the request if Upstash fails to avoid blocking users
    next();
  }
};

export default rateLimiter;
