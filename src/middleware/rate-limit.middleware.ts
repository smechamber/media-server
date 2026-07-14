import rateLimit from "express-rate-limit";

export const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many upload requests. Please try again later.",
  },
});

export const deleteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many delete requests. Please try again later.",
  },
});