import { ActionFunctionArgs, json } from "@remix-run/node";
import { sendEmail } from "~/services/ses.server";
import template from "./template";
import Challenge from "~/components/turnstile/challenge.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const token = String(formData.get("cf-turnstile-response"));
  formData.delete("cf-turnstile-response");

  const challenge = await Challenge(token);

  if (!challenge.success)
    return json({
      success: null,
      error: { message: "Failed to send email, try again !" },
    });

  const send = await sendEmail(
    template({
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      object: String(formData.get("object")),
      message: String(formData.get("message")),
    })
  );
  if (send.error) {
    return json({
      success: null,
      error: { message: "Failed to send email, try again !" },
    });
  }
  return json({
    success: { message: "Email sent" },
    error: null,
  });
};
export default action;
