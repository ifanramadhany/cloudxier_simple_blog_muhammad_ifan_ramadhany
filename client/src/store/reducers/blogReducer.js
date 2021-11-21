import { GET_BLOGS, GET_BLOG_BY_ID, SET_ERROR_BLOG, SET_FLAGGER, SET_LOADING_BLOG } from "../keys"

const initialState = {
  blogs: [],
  blogById: {},
  isLoading: false,
  error: null,
  flagger: false
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_FLAGGER:
      return { ...state, flagger: payload }
    case SET_LOADING_BLOG:
      return { ...state, isLoading: payload }
    case SET_ERROR_BLOG:
      return { ...state, error: payload }
    case GET_BLOGS:
      return { ...state, blogs: payload }
    case GET_BLOG_BY_ID:
      return { ...state, blogById: payload}
    default:
      return state
  }
}