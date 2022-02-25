import { db, projectStorage, projectAuth } from '../firebase/config'

export async function login (_, { email, password }) {
  await projectAuth.signInWithEmailAndPassword(email, password)
}

export async function logout () {
  await projectAuth.signOut()
}

export async function getImages () {
  const res = await db.collection('images').get()
  
  const data = res.docs.map( doc => {
    return { ...doc.data(), id: doc.id }
  })
  return data.sort((a, b) =>  b.createdAt.seconds - a.createdAt.seconds)
}

export async function getComments ({ state, commit }) {
  const res = await db.collection('comments')
    .where('imageId', '==', state.selectedId)
    .get()
  
  const data = res.docs.map( doc => {
    return { ...doc.data(), id: doc.id }
  })
  const sortData = data.sort((a, b) =>  a.createdAt.seconds - b.createdAt.seconds)
  
  commit('SET', { state: 'comments', data: sortData })
}

export async function updateComment ({ commit }, payload) {
  const comment = { ...payload }
  const id = payload.id
  delete comment.id

  await db.collection('comments')
    .doc(id).update(comment)

  commit('UPDATE_COMMENT', payload )
}

export async function deleteComment ({ state, commit }) {
  await db.collection('comments')
    .doc(state.deleteCommentId).delete()

  commit('DELETE_COMMENT', state.deleteCommentId )
  commit('SET', { state: 'deleteCommentId', data: null })
}

export async function getImage ({ state, commit }) {
  const res = await db.collection('images').doc(state.selectedId).get()
  const image = { ...res.data(), id: res.id }

  commit('SET', { state: 'selectedImage', data: image })
}

export async function addDoc ( _, { state, data }) {
  await db.collection(state).add(data)
}

export async function addComment ( { commit }, payload) {
  const res = await db.collection(payload.state).add(payload.data)
  payload.data.id = res.id

  commit('PUSH_ARRAY', payload)
}

export async function uploadImage ( _, { file, userId } ) {
  const filePath = `/images/${userId}/${file.name}`
  const storage = projectStorage.ref(filePath)

  const res = await storage.put(file)
  const url = await res.ref.getDownloadURL()

  return url
}

export function set ({ commit }, payload) {
  commit('SET', payload)
}
