import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Home" },
  { name: "description", content: "Coques en Stock • Home" },
];

export default function Index() {
  return (
    <main>
      <h4>En pleine refonte !</h4>
      <p>
        Notre site se métamorphose pour vous offrir une expérience encore plus
        palpitante.
      </p>
      <p>Préparez-vous à hisser de nouvelles voiles virtuelles.</p>
      <p>En attendant, restez connectés!</p>
    </main>
  );
}
