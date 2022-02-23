import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export function getImages ({ commit }) {
  const colRef = collection(db, 'images')

  getDocs(colRef)
    .then( snapshot => {
      let imgs = []
      snapshot.docs.forEach(doc => {
        imgs.push({ ...doc.data(), id: doc.id })
      })
      commit('SET_IMAGES', imgs)
    })
}