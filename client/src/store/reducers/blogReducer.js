import { GET_BLOGS, SET_ERROR_BLOG, SET_LOADING_BLOG } from "../keys"

const initialState = {
  blogs: [],
  isLoading: false,
  error: null
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING_BLOG:
      return { ...state, loading: payload }
    case SET_ERROR_BLOG:
      return { ...state, error: payload }
    case GET_BLOGS:
      return { ...state, blogs: payload }
    default:
      return state
  }
}