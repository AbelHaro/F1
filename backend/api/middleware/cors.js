import cors from "cors";

const ACCEPTED_ORIGINS = [
  /^http:\/\/localhost:\d+$/, // Allow any localhost port
  /\.vercel\.app$/, // Allow any subdomain of vercel.app
];

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAccepted = ACCEPTED_ORIGINS.some((pattern) =>
        pattern.test(origin)
      );

      if (isAccepted) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });
