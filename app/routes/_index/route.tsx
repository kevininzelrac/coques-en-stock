import type { MetaFunction } from "@remix-run/node";
import Transition from "~/components/transition";
import sleep from "~/utils/sleep";

export const clientLoader = async () => {
  await sleep();
  return null;
};

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Home" },
  { name: "description", content: "Coques en Stock • Home" },
];

export default function Index() {
  return (
    <Transition>
      <main>
        <h4>En pleine refonte !</h4>
        <p>
          Notre site se métamorphose pour vous offrir une expérience encore plus
          palpitante.
        </p>
        <p>Préparez-vous à hisser de nouvelles voiles virtuelles.</p>
        <p>En attendant, restez connectés!</p>
      </main>
    </Transition>
  );
}
