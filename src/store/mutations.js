export function SET (state, payload) {
  state[payload.state] = payload.data
}

export function PUSH_ARRAY (state, payload) {
  state[payload.state] = [...state[payload.state], payload.data]
}

export function UPDATE_COMMENT (state, payload) {
  const index = state.comments.findIndex(com => com.id === payload.id)

  state.comments[index] = payload
}

export function DELETE_COMMENT (state, payload) {
  state.comments = state.comments.filter(({ id }) => id !== payload)
}
