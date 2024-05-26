import { openDB } from "./client";

export default async function _delete(
  store: string,
  key: string
): Promise<void> {
  const idbClient = await openDB();
  const request = idbClient
    .transaction(store, "readwrite")
    .objectStore(store)
    .delete(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
