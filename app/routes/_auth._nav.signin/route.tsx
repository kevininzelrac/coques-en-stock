import {
  ClientLoaderFunctionArgs,
  Link,
  MetaFunction,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import GoogleSign from "./components/googleSign";
import FacebookSign from "./components/facebookSign";
import Transition from "~/components/transition";
import sleep from "~/utils/sleep";

import loader from "./loader";
import action from "./action";
export { loader, action };

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  await sleep();
  return await serverLoader<typeof loader>();
};

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Sign In" },
  { name: "description", content: "Coques en Stock • Sign In" },
];

export default function Signin() {
  const { google_client_id, facebook_client_id } =
    useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <Transition>
        <fetcher.Form method="post">
          <input type="hidden" name="type" value="email" />

          <fieldset>
            <legend>Email</legend>
            <input type="email" name="email" required />
          </fieldset>

          <fieldset>
            <legend>Password</legend>
            <input
              type={hidden ? "password" : "text"}
              name="password"
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

          <button data-primary>submit</button>

          <Link to="/password/forgot">
            <small>Forgot Password ?</small>
          </Link>

          {/* STATE */}
          {fetcher.state !== "idle" ? <span>{fetcher.state}...</span> : null}
          {/* ERROR */}
          {fetcher.data?.error ? (
            <span data-error>{fetcher.data.error.message}</span>
          ) : null}
        </fetcher.Form>
      </Transition>
      <Transition>
        <div>
          <fieldset data-or>
            <legend>or</legend>
          </fieldset>
          <GoogleSign client_id={google_client_id} />
          <fieldset data-or>
            <legend>or</legend>
          </fieldset>
          <FacebookSign client_id={facebook_client_id} />
        </div>
      </Transition>
    </>
  );
}
