import { useLoaderData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

import loader from "./loader";
export { loader };

export const meta: MetaFunction = () => {
  return [
    { title: "Confirm Sign Up" },
    { name: "description", content: "Confirm Sign Up" },
  ];
};

export default function SignUpToken() {
  const data = useLoaderData<typeof loader>();

  if (data.error) {
    return <span>{data.error.message}</span>;
  }
  return null;
}
