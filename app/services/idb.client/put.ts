import { openDB } from "./client";

export default async function put(
  store: string,
  key: string,
  value: any
): Promise<void> {
  const idbClient = await openDB();
  const request = idbClient
    .transaction(store, "readwrite")
    .objectStore(store)
    .put(value, key);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
