import { JwtPayload } from "jsonwebtoken";

export interface JwtRefreshPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}