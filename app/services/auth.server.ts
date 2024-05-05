import jwt, { JwtPayload } from "jsonwebtoken";
import { userSession } from "./session.server";
import { Session, SessionData } from "@remix-run/node";
import prisma from "./prisma.server";

export default async function auth(request: Request) {
  const user = await userSession.getSession(request.headers.get("Cookie"));
  const accessToken = user.get("accessToken");

  if (!accessToken) return await destroy(user);

  const verifiedAccess = verify(accessToken, process.env.ACCESS_SECRET);

  if (!verifiedAccess) {
    const verifiedRefresh = verify(
      user.get("refreshToken"),
      process.env.REFRESH_SECRET
    );

    if (!verifiedRefresh) return await destroy(user);

    const match = await getRefreshToken(user.get("refreshToken"));

    if (!match) return await destroy(user);

    const verifiedMatch = verify(match.token, process.env.REFRESH_SECRET);

    if (!verifiedMatch) return await destroy(user);

    const { id, email, firstname, lastname, avatar } = verifiedMatch;

    const newAccessToken = jwt.sign(
      { id, email, firstname, avatar },
      process.env.ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_DURATION }
    );

    user.set("accessToken", newAccessToken);

    return {
      id,
      email,
      firstname,
      lastname,
      avatar,
      headers: {
        "Set-Cookie": await userSession.commitSession(user),
      },
    };
  }

  const { id, email, firstname, lastname, avatar } = verifiedAccess;

  return {
    id,
    email,
    firstname,
    lastname,
    avatar,
    headers: {
      "Set-Cookie": "",
    },
  };
}

const destroy = async (user: Session<SessionData, SessionData>) => {
  return {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    avatar: "",
    headers: {
      "Set-Cookie": await userSession.destroySession(user),
    },
  };
};

const verify = (token: string, secret: string) => {
  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    return {
      id: String(payload.id),
      email: String(payload.email),
      firstname: String(payload.firstname),
      lastname: String(payload.lastname),
      avatar: String(payload.avatar),
    };
  } catch (error) {
    return null;
  }
};

export const getRefreshToken = async (token: string) => {
  return await prisma.refreshToken.findUnique({
    where: {
      token,
    },
    select: {
      token: true,
    },
  });
};
