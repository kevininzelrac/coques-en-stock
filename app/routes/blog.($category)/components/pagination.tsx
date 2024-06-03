import { useLoaderData, useSearchParams } from "@remix-run/react";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import loader from "../loader";

export default function Pagination() {
  const { postsCount } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const take = Number(searchParams.get("take")) || 5;
  const skip = Number(searchParams.get("skip")) || 0;

  if (postsCount.error) return <div data-error>{postsCount.error.message}</div>;
  if (postsCount.data <= 5) return null;
  return (
    <nav className="pagination">
      <button
        onClick={() => {
          skip <= 1
            ? (searchParams.delete("skip"), setSearchParams(searchParams))
            : setSearchParams({ skip: String(skip - 1) });
        }}
        disabled={skip === 0}
      >
        <BsArrowLeft />
      </button>
      <select
        value={take}
        onChange={(e) => {
          setSearchParams((prev) => {
            if (take <= 5) prev.delete("take");
            prev.set("take", e.target.value);
            return prev;
          });
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <button
        onClick={() => {
          setSearchParams({ skip: String(skip + 1) });
        }}
        disabled={skip * 4 + 4 >= postsCount.data}
      >
        <BsArrowRight />
      </button>
    </nav>
  );
}
