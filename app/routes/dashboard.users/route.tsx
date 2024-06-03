import { LinksFunction } from "@remix-run/node";
import {
  ClientLoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";

import Back from "~/components/back";
import Img from "~/components/img";

import styles from "./styles.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
import Transition from "~/components/transition";
import sleep from "~/utils/sleep";
export { loader, action, ErrorBoundary };

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  await sleep();
  return await serverLoader<typeof loader>();
};
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <div data-loading></div>;
}

export default function Users() {
  const { users, roles } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    fetcher.submit(JSON.parse(e.target.value), {
      method: "PATCH",
      encType: "application/json",
    });
  };

  return (
    <>
      <Back />
      <Transition>
        <section>
          <h3>Users</h3>
          {users.map((user) => (
            <article key={user.id}>
              <div>
                <strong>
                  {user.firstname} {user.lastname}
                </strong>
                <p>{user.email}</p>
                <select
                  value={JSON.stringify({ id: user.id, role: user.role })}
                  onChange={handleChange}
                >
                  {/* {["ADMIN", "EDITOR", "GUEST", "FOLLOWER"].map((role) => ( */}
                  {roles.map((role) => (
                    <option
                      value={JSON.stringify({ id: user.id, role })}
                      key={role}
                    >
                      {role}
                    </option>
                  ))}
                </select>

                <time>
                  membre depuis le{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </time>
              </div>
              <Img src={user.avatar} alt={user.firstname} width={80} />
            </article>
          ))}
        </section>
      </Transition>
    </>
  );
}
