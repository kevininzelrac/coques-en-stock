import { ActionFunctionArgs, json } from "@remix-run/node";
import jwt from "jsonwebtoken";
import { sendEmail } from "~/services/ses.server";
import template from "./template";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const password = String(formData.get("password"));
  const confirm = String(formData.get("confirm"));

  if (password !== confirm)
    return json(
      { success: null, error: { message: "Passwords do not match" } },
      { status: 400 }
    );

  const token = jwt.sign(
    { id: String(formData.get("id")), password },
    process.env.ACCESS_SECRET,
    { expiresIn: 300 }
  );

  const mail = await sendEmail(
    template({
      email: String(formData.get("email")),
      firstname: String(formData.get("firstname")),
      token,
    })
  );
  if (mail.error)
    return json({
      success: null,
      error: { message: "Failed to send email, try again !" },
    });

  return json({
    error: null,
    success: {
      message: "To confirm this action, please check your email",
    },
  });
};

export default action;
