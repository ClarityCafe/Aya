import { JWK, JWT } from "jose";
import { NextApiRequest } from "next";

const secret = process.env.AYA_JWT_SECRET;
const secretKey = JWK.asKey(secret);

export const isAuthed = (req: NextApiRequest) => {
  const token = req.headers.authorization || req.cookies.token;

  try {
    return !!verifyToken(token);
  } catch {
    return false;
  }
};

export const makeToken = (id: string) => JWT.sign({ id }, secretKey);

export const verifyToken = (token: string) => JWT.verify(token, secretKey);
