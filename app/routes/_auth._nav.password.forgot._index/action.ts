import { ActionFunctionArgs, json } from "@remix-run/node";
import jwt from "jsonwebtoken";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";
import { sendEmail } from "~/services/ses.server";
import template from "./template";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));

  const user = await withTryCatch(
    prisma.user.findUnique({
      where: { email },
      select: { id: true, firstname: true, email: true },
    }),
    "User not found"
  );
  if (user.error)
    return json({
      success: null,
      error: user.error,
    });

  const token = jwt.sign(
    {
      id: user.data.id,
      email: user.data.email,
    },
    process.env.ACCESS_SECRET,
    {
      expiresIn: 300,
    }
  );

  const send = await sendEmail(
    template({
      email,
      firstname: user.data.firstname,
      token,
    })
  );
  if (send.error)
    return json({
      success: null,
      error: { message: "Failed to send email, try again !" },
    });

  return json({
    success: {
      message: "To confirm this action, please check your email",
    },
    error: null,
  });
};
export default action;
