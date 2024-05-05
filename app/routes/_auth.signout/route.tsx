import { MetaFunction, useLoaderData, useSubmit } from "@remix-run/react";

import loader from "./loader";
import action from "./action";
export { loader, action };

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Sign Out" },
  { name: "description", content: "Coques en Stock • Sign Out" },
];

export default function Signout() {
  const { id } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  return (
    <>
      <p>Are you sure you want to sign out?</p>
      <button
        data-primary
        onClick={() =>
          submit({ id }, { method: "post", encType: "application/json" })
        }
      >
        Sign out
      </button>
    </>
  );
}
