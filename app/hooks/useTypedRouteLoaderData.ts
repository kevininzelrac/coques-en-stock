import { useRouteLoaderData } from "@remix-run/react";
import { SerializeFrom } from "@remix-run/node";

function useTypedRouteLoaderData<T>(route: string) {
  return useRouteLoaderData(route) as SerializeFrom<T>;
}
export default useTypedRouteLoaderData;
