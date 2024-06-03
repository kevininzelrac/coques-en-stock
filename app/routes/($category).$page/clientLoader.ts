import { ClientLoaderFunctionArgs } from "@remix-run/react";
import sleep from "~/utils/sleep";
import loader from "./loader";

const clientLoader = async ({ serverLoader }: ClientLoaderFunctionArgs) => {
  await sleep();
  return await serverLoader<typeof loader>();
};
clientLoader.hydrate = true;

export default clientLoader;
