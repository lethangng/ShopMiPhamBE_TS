import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (userId: string | number) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN ?? "", {
    expiresIn: "15m",
    // expiresIn: "10s",
  });
  return token;
};

const refreshToken = (userId: string | number) => {
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_TOKEN ?? "",
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
};

const decodeRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN ?? "") as {
    userId: string;
  };
};

const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_TOKEN ?? "") as {
    userId: string;
  };
};

export default { createToken, refreshToken, decodeRefreshToken, decodeToken };
