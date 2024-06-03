import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import loader from "../loader";
import Img from "~/components/img";

export default function Users({
  users,
}: {
  users: Awaited<SerializeFrom<typeof loader>["users"]>;
}) {
  return (
    <article>
      <h3>
        <Link to="users">Users</Link>
        <small> {users.length}</small>
      </h3>
      <div className="scroll">
        {!users.length ? (
          <p>No users</p>
        ) : (
          users.map((user) => (
            <div key={user.id}>
              <Img src={user.avatar} alt={user.firstname} />
              <div>
                <span>
                  <strong>{user.firstname}</strong>&nbsp;
                </span>
                <p>{user.email}</p>
                <p style={{ color: "var(--darkGrey" }}>{user.role}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
