import { useState } from "react";
import Dialog from "~/components/dialog";
import Transition from "~/components/transition";
import sleep from "~/utils/sleep";

import ErrorBoundary from "~/components/errorBoundary";
export { ErrorBoundary };

export const clientLoader = async () => {
  await sleep();
  return null;
};
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export default function Shop() {
  const [display, setDisplay] = useState(false);

  const handleClick = () => setDisplay(!display);

  return (
    <Transition>
      <main>
        <article>
          <button data-primary onClick={handleClick}>
            buy
          </button>
          {display ? (
            <Dialog handleClick={handleClick}>
              <div>Dialog Test</div>
            </Dialog>
          ) : null}
        </article>
      </main>
    </Transition>
  );
}
