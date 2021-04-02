import { storage } from './FirebaseLoader'

export default async function Upload(file, path, metadata = {}) {
  const collection = storage.ref(path + '/')
  const snapshot = await collection.put(file, metadata)
  const url = await snapshot.ref.getDownloadURL()
  return { snapshot, url }
}
