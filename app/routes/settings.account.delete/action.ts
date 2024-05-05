import { ActionFunctionArgs, json } from "@remix-run/node";
import jwt from "jsonwebtoken";
import { sendEmail } from "~/services/ses.server";
import template from "./template";

const action = async ({ request }: ActionFunctionArgs) => {
  const {
    id,
    firstname,
    email,
  }: { id: string; firstname: string; email: string } = await request.json();

  const token = jwt.sign({ id }, process.env.ACCESS_SECRET, { expiresIn: 300 });

  const mail = await sendEmail(
    template({
      email,
      firstname,
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
