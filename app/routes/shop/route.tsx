import { useState } from "react";
import Dialog from "~/components/dialog";

export default function Shop() {
  const [display, setDisplay] = useState(false);

  const handleClick = () => setDisplay(!display);

  return (
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
  );
}
