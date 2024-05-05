import { ActionFunction, ActionFunctionArgs, json } from "@remix-run/node";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "~/services/prisma.server";
import withTryCatch from "~/middlewares/withTryCatch";
import { sendEmail } from "~/services/ses.server";
import template from "./template";

const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const user = await withTryCatch(
    prisma.user.findUnique({
      where: { email: String(formData.get("email")) },
      select: { email: true },
    }),
    "user not found"
  );
  if (user.data?.email === String(formData.get("email")))
    return json({
      success: null,
      error: { message: "User already exists" },
    });

  const token = jwt.sign(
    {
      firstname: String(formData.get("firstname")),
      lastname: String(formData.get("lastname")),
      email: String(formData.get("email")),
      passwordHash: await bcrypt.hash(String(formData.get("password")), 10),
    },
    process.env.ACCESS_SECRET,
    { expiresIn: 300 }
  );
  const send = await sendEmail(
    template({
      email: String(formData.get("email")),
      firstname: String(formData.get("firstname")),
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

// function validateEmail(email: string | undefined): boolean {
//   if (undefined === email) {
//     return false;
//   }
//   // eslint-disable-next-line no-useless-escape
//   const mailformat =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return email.match(mailformat) ? true : false;
// }
