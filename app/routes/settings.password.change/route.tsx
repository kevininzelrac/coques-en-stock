import {
  ClientLoaderFunctionArgs,
  MetaFunction,
  useFetcher,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useTypedRouteLoaderData from "~/hooks/useTypedRouteLoaderData";

import sleep from "~/utils/sleep";
import Transition from "~/components/transition";

import loader from "../settings/loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  await sleep();
  return await serverLoader<typeof loader>();
};
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Change Password" },
  { name: "description", content: "Coques en Stock • Change Password" },
];

export default function Password() {
  const { user } = useTypedRouteLoaderData<typeof loader>("routes/settings")!;
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
    <Transition>
      <fetcher.Form
        method="post"
        ref={formRef}
        aria-disabled={isSubmitting}
        style={{
          opacity: isSubmitting ? ".8" : "1",
        }}
      >
        {fetcher.data?.success ? (
          <div>{fetcher.data.success.message}</div>
        ) : (
          <>
            <fieldset style={border}>
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" name="email" value={user.email} />
              <input type="hidden" name="firstname" value={user.firstname} />

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
            {fetcher.state !== "idle" ? <div>{fetcher.state}...</div> : null}
            {fetcher.data?.error ? (
              <div>{fetcher.data.error.message}</div>
            ) : null}
          </>
        )}
      </fetcher.Form>
    </Transition>
  );
}
