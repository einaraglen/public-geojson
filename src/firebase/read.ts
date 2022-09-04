import { db } from './db'
import { doc, getDoc } from 'firebase/firestore/lite'

export const read = (version: string, document: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const ref = doc(db, version, document)
    getDoc(ref)
      .then((snap: any) => {
        if (!snap.exists()) return reject('Document does not exist')
        resolve(snap.data())
      })
      .catch((err) => reject(err))
  })
}
