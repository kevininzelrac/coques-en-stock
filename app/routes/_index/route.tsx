import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Coques en Stock" },
    { name: "description", content: "Home" },
  ];
};

export default function Index() {
  return (
    <main>
      <h2>Home</h2>
      <p>Hello, World !</p>
    </main>
  );
}
