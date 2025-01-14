import jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (
  payload: Object,
  options: SignOptions = {}
) => {
  return jwt.sign(payload, 'accessTokenPrivateKey', {
    ...(options && options),
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, "accessTokenPrivateKey");
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
