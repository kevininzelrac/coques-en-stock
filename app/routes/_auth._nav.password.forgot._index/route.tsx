import { MetaFunction, useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";

import action from "./action";
export { action };

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Forgot password" },
  { name: "description", content: "Coques en Stock • Forgot password" },
];

export default function ForgotPassword() {
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  let isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !fetcher.data.error) {
      formRef.current?.reset();
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <>
      <fetcher.Form method="post" ref={formRef} aria-disabled={isSubmitting}>
        {fetcher.data?.success ? (
          <label data-success>{fetcher.data.success.message}</label>
        ) : (
          <>
            <label>Forgot Password ?</label>
            <fieldset>
              <legend>email</legend>
              <input type="text" name="email" required />
            </fieldset>
            <button data-primary>submit</button>
            {fetcher.state !== "idle" ? (
              <label>{fetcher.state}...</label>
            ) : null}
            {fetcher.data?.error ? (
              <label data-error>{fetcher.data.error.message}</label>
            ) : null}
          </>
        )}
      </fetcher.Form>
    </>
  );
}
