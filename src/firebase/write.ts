import { db } from './db'
import { setDoc, doc } from 'firebase/firestore/lite'
import { FeatureCollection } from 'geojson'

export const write = (version: string, document: string, collection: FeatureCollection): Promise<void> => {
  return setDoc(doc(db, version, document), collection)
}
