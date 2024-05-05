import { MetaFunction, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import loader from "./loader";
import action from "./action";
export { loader, action };

export const meta: MetaFunction = () => [
  { title: "change_password" },
  { name: "change_password", content: "Change password" },
];

export default function ForgotPasswordToken() {
  const { user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [hidden, setHidden] = useState(true);
  const border = !password
    ? {}
    : password === confirm
    ? { borderColor: "green" }
    : { borderColor: "crimson" };

  const disabled = password === "" || confirm === "" || password !== confirm;
  let isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !fetcher.data.error) {
      formRef.current?.reset();
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <fetcher.Form
      method="post"
      ref={formRef}
      aria-disabled={isSubmitting}
      style={{
        opacity: isSubmitting ? ".8" : "1",
      }}
    >
      <fieldset style={border}>
        <input type="hidden" name="id" value={user.id} />

        <legend>New password</legend>
        <input
          type={hidden ? "password" : "text"}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </fieldset>
      <fieldset style={border}>
        <legend>Confirm password</legend>
        <input
          type={hidden ? "password" : "text"}
          name="confirm"
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </fieldset>
      <button type="button" onClick={() => setHidden(!hidden)}>
        {hidden ? (
          <BsEyeSlash size="25" color="#336699" />
        ) : (
          <BsEye size="25" color="#336699" />
        )}
      </button>
      <button
        data-primary
        disabled={disabled}
        style={{ opacity: disabled ? ".8" : "1" }}
      >
        Change password
      </button>
      {fetcher.data?.error ? <div>{fetcher.data.error.message}</div> : null}
    </fetcher.Form>
  );
}
