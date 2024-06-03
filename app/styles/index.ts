import { LinksFunction } from "@remix-run/node";

import reset from "./reset.css?url";
import root from "./root.css?url";
import variables from "./variables.css?url";
import a from "./a.css?url";
import button from "./button.css?url";
import animations from "./animations.css?url";
import form from "./form.css?url";
import loading from "./loading.css?url";
import dialog from "./dialog.css?url";
import errors from "./errors.css?url";
import nav from "./nav.css?url";
import header from "./header.css?url";
import footer from "./footer.css?url";

const links: LinksFunction = () => [
  { rel: "stylesheet", href: reset },
  { rel: "stylesheet", href: root },
  { rel: "stylesheet", href: variables },
  { rel: "stylesheet", href: a },
  { rel: "stylesheet", href: button },
  { rel: "stylesheet", href: animations },
  { rel: "stylesheet", href: form },
  { rel: "stylesheet", href: loading },
  { rel: "stylesheet", href: dialog },
  { rel: "stylesheet", href: errors },
  { rel: "stylesheet", href: nav },
  { rel: "stylesheet", href: header },
  { rel: "stylesheet", href: footer },
];

export default links;
