import { openDB } from "./client";

export default async function list(store: string): Promise<any[]> {
  const idbClient = await openDB();
  const request = idbClient.transaction(store).objectStore(store).getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
