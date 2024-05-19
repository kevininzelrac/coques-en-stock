import {
  ClientLoaderFunctionArgs,
  MetaFunction,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";

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
  { title: "Coques en Stock • Sign Out" },
  { name: "description", content: "Coques en Stock • Sign Out" },
];

export default function Signout() {
  const { id } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  return (
    <Transition>
      <div>
        <p>Are you sure you want to sign out?</p>
        <button
          data-primary
          onClick={() =>
            submit({ id }, { method: "post", encType: "application/json" })
          }
        >
          Sign out
        </button>
      </div>
    </Transition>
  );
}
