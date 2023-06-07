import { JwtRefreshPayload } from "./jwtRefreshPayload";

export {};

declare global {
  namespace Express {
    interface Request {
      user: JwtRefreshPayload;
    }
  }
}
