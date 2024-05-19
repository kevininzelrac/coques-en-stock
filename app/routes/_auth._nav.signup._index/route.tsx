import { MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs, useFetcher } from "@remix-run/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";

import sleep from "~/utils/sleep";
import Transition from "~/components/transition";

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
  { title: "Coques en Stock • Sign Up" },
  { name: "description", content: "Coques en Stock • Sign Up" },
];

export default function SignUp() {
  const fetcher = useFetcher<typeof action>();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [hidden, setHidden] = useState(true);

  const border = !password
    ? {}
    : password === confirm
    ? { borderColor: "green" }
    : { borderColor: "crimson" };

  const disabled = password === "" || confirm === "" || password !== confirm;

  return (
    <Transition>
      <fetcher.Form method="post">
        {fetcher.data?.success ? (
          <label data-success>{fetcher.data.success.message}</label>
        ) : (
          <>
            <fieldset>
              <legend>Prénom</legend>
              <input type="text" name="firstname" required />
            </fieldset>
            <fieldset>
              <legend>Nom</legend>
              <input type="text" name="lastname" required />
            </fieldset>
            <fieldset>
              <legend>Email</legend>
              <input type="email" name="email" required />
            </fieldset>
            <fieldset style={border}>
              <legend>Mot de passe</legend>
              <input
                type={hidden ? "password" : "text"}
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <fieldset style={border}>
              <legend>Confirmer</legend>
              <input
                type={hidden ? "password" : "text"}
                name="confirm"
                required
                onChange={(e) => setConfirm(e.target.value)}
              />
            </fieldset>
            <button type="button" onClick={() => setHidden(!hidden)}>
              {hidden ? (
                <BsEyeSlash size="25" color="#336699" />
              ) : (
                <BsEye size="25" color="#336699" />
              )}
            </button>
            <button data-primary disabled={disabled}>
              submit
            </button>
          </>
        )}
        {fetcher.state !== "idle" ? <label>{fetcher.state}...</label> : null}
        {fetcher.data?.error ? (
          <label data-error>{fetcher.data.error.message}</label>
        ) : null}
      </fetcher.Form>
    </Transition>
  );
}
