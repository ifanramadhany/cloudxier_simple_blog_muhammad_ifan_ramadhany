import apiBlog from "../../apis/apiBlog";
import { GET_BLOGS, SET_ERROR_BLOG, SET_LOADING_BLOG, GET_BLOG_BY_ID } from "../keys";

export function setLoading(payload) {
  return {
    type: SET_LOADING_BLOG,
    payload
  }
}

export function setError(payload) {
  return {
    type: SET_ERROR_BLOG,
    payload,
  };
}

export function getBlogs(payload) {
  return {
    type: GET_BLOGS,
    payload
  }
}

export function getBlogById(payload) {
  return {
    type: GET_BLOG_BY_ID,
    payload
  }
}

export function fetchBlogById(id) {
  return async function (dispatch) {
    dispatch(setLoading(true))
    try {
      const { data } = await apiBlog({
        method: 'GET',
        url: `/blogs/${id}`
      })
      dispatch(getBlogById(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err.response.data);
      dispatch(setError(err.response.data))
    }
  }
}

export function fetchBlogs() {
  return async function (dispatch) {
    dispatch(setLoading(true))
    try {
      const { data } = await apiBlog({
        method: 'GET',
        url: '/blogs'
      })
      dispatch(getBlogs(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err.response.data);
      dispatch(setError(err.response.data))
    }
  }
}