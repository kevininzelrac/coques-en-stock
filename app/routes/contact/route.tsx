import { useFetcher, useLoaderData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";

import Turnstile from "~/components/turnstile";

import loader from "./loader";
import action from "./action";
export { loader, action };

export const meta: MetaFunction = () => [
  { title: "Contact" },
  { name: "description", content: "Contact" },
];

export default function Contact() {
  const { siteKey } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const [successMessage, setSuccessMessage] = useState("");

  let isSubmitting = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && !fetcher.data.error) {
      formRef.current?.reset();
      setSuccessMessage(fetcher.data.success.message);

      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <main>
      <article>
        <fetcher.Form
          method="post"
          ref={formRef}
          aria-disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? ".6" : "1",
          }}
        >
          <fieldset>
            <legend>Nom</legend>
            <input type="text" name="name" required />
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input type="email" name="email" required />
          </fieldset>
          <fieldset>
            <legend>Objet</legend>
            <input type="text" name="object" required />
          </fieldset>
          <fieldset>
            <legend>Message</legend>
            <textarea name="message" rows={4} required></textarea>
          </fieldset>
          <button disabled={isSubmitting}>send</button>
          {isSubmitting ? fetcher.state : null}
          {successMessage ? (
            <div style={{ color: "green" }}>{successMessage}</div>
          ) : null}
          {fetcher.data?.error ? (
            <div style={{ color: "crimson" }}>{fetcher.data.error.message}</div>
          ) : null}
          {siteKey && <Turnstile siteKey={siteKey} />}
        </fetcher.Form>
      </article>
    </main>
  );
}
