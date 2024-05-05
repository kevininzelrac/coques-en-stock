import { LinksFunction } from "@remix-run/node";

import reset from "./reset.css?url";
import root from "./root.css?url";
import variables from "./variables.css?url";
import a from "./a.css?url";
import button from "./button.css?url";
import animations from "./animations.css?url";
import form from "./form.css?url";

const links: LinksFunction = () => [
  { rel: "stylesheet", href: reset },
  { rel: "stylesheet", href: root },
  { rel: "stylesheet", href: variables },
  { rel: "stylesheet", href: a },
  { rel: "stylesheet", href: button },
  { rel: "stylesheet", href: animations },
  { rel: "stylesheet", href: form },
];

export default links;
