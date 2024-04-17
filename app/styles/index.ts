import { LinksFunction } from "@remix-run/node";

import reset from "./reset.css?url";
import root from "./root.css?url";
import variables from "./variables.css?url";
import animations from "./animations.css?url";

const links: LinksFunction = () => [
  { rel: "stylesheet", href: reset },
  { rel: "stylesheet", href: root },
  { rel: "stylesheet", href: variables },
  { rel: "stylesheet", href: animations },
];

export default links;
