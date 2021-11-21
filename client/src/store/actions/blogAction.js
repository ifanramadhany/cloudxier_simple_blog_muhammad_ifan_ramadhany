import { toast } from "react-toastify";
import apiBlog from "../../apis/apiBlog";
import { GET_BLOGS, SET_ERROR_BLOG, SET_LOADING_BLOG, GET_BLOG_BY_ID, SET_FLAGGER } from "../keys";


export function setLoading(payload) {
  return {
    type: SET_LOADING_BLOG,
    payload
  }
}

export function setFlagger(payload) {
  return {
    type: SET_FLAGGER,
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

export function deleteBlogAction(id) {
  return async function (dispatch) {
    dispatch(setLoading(true))
    try {
      await apiBlog({
        method: 'DELETE',
        url: `/blogs/${id}`,
      })
      dispatch(fetchBlogs())
      toast.success("Successfully Deleted");
      dispatch(setLoading(false))
      dispatch(setFlagger(false))
      dispatch(setError(null))
    } catch (err) {
      dispatch(setFlagger(true))
      console.log(err.response.data, 'di action');
      dispatch(setError(err.response.data))
    }
  }
}

export function editBlog(data) {
  const {formEdit, id} = data
  console.log(data, 'masuk sini edit');
  return async function (dispatch) {
    dispatch(setLoading(true))
    try {
      await apiBlog({
        method: 'PUT',
        url: `/blogs/${id}`,
        data: formEdit
      })
      dispatch(fetchBlogs())
      toast.success("Successfully Edited");
      dispatch(setLoading(false))
      dispatch(setFlagger(false))
      dispatch(setError(null))
    } catch (err) {
      dispatch(setFlagger(true))
      console.log(err.response.data, 'di action');
      dispatch(setError(err.response.data))
    }
  }
}

export function createBlog(form) {
  console.log('masuk sini');
  return async function (dispatch) {
    dispatch(setLoading(true))
    try {
      await apiBlog({
        method: 'POST',
        url: `/blogs`,
        data: form
      })
      dispatch(fetchBlogs())
      toast.success("Successfully Created");
      dispatch(setLoading(false))
      dispatch(setFlagger(false))
    } catch (err) {
      dispatch(setFlagger(true))
      console.log(err.response.data, 'di action');
      dispatch(setError(err.response.data))
    }
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
      dispatch(setFlagger(false))
    } catch (err) {
      dispatch(setFlagger(true))
      console.log(err.response.data, 'di action');
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
      dispatch(setFlagger(false))
    } catch (err) {
      dispatch(setFlagger(true))
      console.log(err.response.data, 'di action');
      dispatch(setError(err.response.data))
    }
  }
} 

