import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";

import Img from "~/components/img";
import loader from "../loader";

export default function Pages({
  pages,
}: {
  pages: Awaited<SerializeFrom<typeof loader>["pages"]>;
}) {
  return (
    <article>
      <h3>
        Pages <small>{pages.length}</small>
      </h3>
      <div className="scroll">
        {!pages.length ? (
          <p>No pending pages</p>
        ) : (
          pages.map((page) => (
            <div
              key={page.id}
              style={{
                borderLeft:
                  page.status === "DRAFT" ? "5px solid orange" : "none",
              }}
            >
              <Img src={page.author.avatar} alt={page.author.firstname} />
              <div>
                <h4>
                  <Link to={`/${page.title}`}>{page.title}</Link>
                </h4>
                <p>
                  written by <strong>{page.author.firstname}</strong>
                </p>
                <p>
                  {page.type.title} • {page.category.title} •{" "}
                  {new Date(page.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
