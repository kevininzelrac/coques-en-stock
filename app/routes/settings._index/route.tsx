import useTypedRouteLoaderData from "~/hooks/useTypedRouteLoaderData";
import { MetaFunction } from "@remix-run/node";

import loader from "../settings/loader";
export { loader };

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Details" },
  { name: "description", content: "Coques en Stock • Details" },
];

export default function Index() {
  const { user } = useTypedRouteLoaderData<typeof loader>("routes/settings")!;
  return (
    <div className="badge">
      <div>
        <strong>
          {user.firstname} {user.lastname}
        </strong>
        <p>{user.email}</p>
        <span>{user.role}</span>
        <time>
          membre depuis le {new Date(user.createdAt).toLocaleDateString()}
        </time>
      </div>
      <img src={user.avatar} alt={user.firstname} width={80} />
    </div>
  );
}
