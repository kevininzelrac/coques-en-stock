import {
  NavLink,
  useLoaderData,
  useLocation,
  useParams,
} from "@remix-run/react";
import usePriviledges from "~/hooks/usePriviledges";
import loader from "../loader";
import Create from "~/components/tools/create";
import Delete from "~/components/tools/delete";

const Categories = () => {
  const { user, categories } = useLoaderData<typeof loader>();
  const { isAdmin, isEditor } = usePriviledges(user);
  const { search } = useLocation();
  const params = useParams();

  return (
    <nav>
      <header>
        <h3>Categories</h3>
        {(isAdmin || isEditor) && <Create type="category" />}
      </header>
      {categories.error ? (
        <div data-error>{categories.error.message}</div>
      ) : !categories.data.length ? (
        <div data-info>Category list empty</div>
      ) : (
        categories.data
          .filter(({ _count }) =>
            isAdmin || isEditor ? _count.posts >= 0 : _count.posts > 0
          )
          .map(({ id, title, _count }) => (
            <div key={id}>
              <NavLink
                to={
                  title === params.category
                    ? `/blog/${search}`
                    : `/blog/${title}${search}`
                }
              >
                {title}
              </NavLink>
              <span>
                <small>{_count.posts}</small>
                {(isAdmin || isEditor) && (
                  <Create type="blog" category={title} />
                )}
                {isAdmin && <Delete id={id} type="category" />}
              </span>
            </div>
          ))
      )}
    </nav>
  );
};

export default Categories;

// import { useLoaderData } from "@remix-run/react";
// import loader from "../loader";

// export default function Categories() {
//   const { user, categories } = useLoaderData<typeof loader>();

//   return (
//     <nav>
//       <pre>
//         <code>{JSON.stringify(categories, null, 2)}</code>
//       </pre>
//     </nav>
//   );
// }
