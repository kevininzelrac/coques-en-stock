import {
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const message = new URL(request.url).searchParams.get("message");
  if (!message) throw redirect("/");
  return json({ message });
};

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Success" },
  { name: "description", content: "Coques en Stock • Success" },
];

export default function Success() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <main>
      <article>
        <h2>{message}</h2>
      </article>
    </main>
  );
}
