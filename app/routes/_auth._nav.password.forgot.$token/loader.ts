import { LoaderFunctionArgs, json } from "@remix-run/node";
import jwt, { JwtPayload } from "jsonwebtoken";

const loader = async ({ params }: LoaderFunctionArgs) => {
  const token = params.token;
  if (!token)
    throw json({ error: { message: "No token found" } }, { status: 400 });

  let verified: JwtPayload;
  try {
    verified = jwt.verify(token!, process.env.ACCESS_SECRET) as JwtPayload;
  } catch (error) {
    console.error("JWT ERROR ", error);
    throw json(null, { status: 400, statusText: "Invalid Token" });
  }

  if (!verified)
    throw json(
      { error: { message: "Invalid Token" } },
      { status: 400, statusText: "Bad Request" }
    );

  return json({
    user: {
      email: String(verified.email),
      id: String(verified.id),
    },
  });
};
export default loader;
