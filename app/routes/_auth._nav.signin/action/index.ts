import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { userSession } from "~/services/session.server";
import jwt from "jsonwebtoken";
import signWithEmail from "./signWithEmail";
import signWithGoogle from "./signWithGoogle";
import putRefreshToken from "./putRefreshToken";
import signWithFacebook from "./signWithFacebook";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = String(formData.get("type"));

  const signUser = async () => {
    if (type === "email") {
      return await signWithEmail(
        String(formData.get("email")),
        String(formData.get("password"))
      );
    }
    if (type === "google")
      return await signWithGoogle(String(formData.get("accessToken")));

    if (type === "facebook") {
      return await signWithFacebook(String(formData.get("accessToken")));
    }
    return {
      data: null,
      error: { message: "You must provide a type" },
    };
  };

  const user = await signUser();
  if (user.error) return json({ error: user.error });

  const refreshToken = jwt.sign(user.data, process.env.REFRESH_SECRET);

  const verifiedRefresh = await putRefreshToken(user.data.id, refreshToken);
  if (!verifiedRefresh)
    return json({ error: { message: "Error creating refresh token" } });

  const accessToken = jwt.sign(user.data, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_DURATION,
  });

  const $user = await userSession.getSession(request.headers.get("Cookie"));
  $user.set("refreshToken", verifiedRefresh);
  $user.set("accessToken", accessToken);

  return redirect("/", {
    headers: {
      "Set-Cookie": await userSession.commitSession($user),
    },
  });
};
export default action;
