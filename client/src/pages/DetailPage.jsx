import React, { useState, Fragment, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  createBlog,
  editBlog,
  fetchBlogById,
  setLoading,
  deleteBlogAction,
} from "../store/actions/blogAction";
import ReactLoading from "react-loading";

export default function DetailPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { blogById, isLoading, error, flagger } = useSelector(
    (state) => state.blogState
  );

  const [changeImage, setChangeImage] = useState(false);
  const [buttonMenu, setButtonMenu] = useState(false);
  const [addNewBlog, setAddNewBlog] = useState(false);
  const [editBlogData, setEditBlogData] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);

  const closeModalAddBlog = () => setAddNewBlog(false);
  const openModalAddBlog = () => setAddNewBlog(true);

  const closeModalEditBlog = () => setEditBlogData(false);
  const openModalEditBlog = () => setEditBlogData(true);

  const closeModalDelete = () => setDeleteBlog(false);
  const openModalDelete = () => setDeleteBlog(true);

  const [userInputEdit, setUserInputEdit] = useState({
    title: "",
    author: "",
    content: "",
    imgUrl: "",
  });
  const [userInputAdd, setUserInputAdd] = useState({
    title: "",
    author: "",
    content: "",
  });
  const [imgUrl, setImgUrl] = useState(null);
  const [imgUrlEdit, setImgUrlEdit] = useState(null);

  const addImage = (e) => {
    setImgUrl(e.target.files[0]);
  };

  const editImage = (e) => {
    setImgUrlEdit(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, []);

  useEffect(() => {
    setUserInputEdit(blogById);
  }, [blogById]);

  const toHomePage = () => history.push("/");

  const onChangeInputAdd = (e, key) => {
    // console.log(e, key);
    const newObj = { ...userInputAdd };
    newObj[key] = e.target.value;

    setUserInputAdd(newObj);
    console.log(newObj);
  };

  function clearAll() {
    setUserInputAdd({
      title: "",
      author: "",
      content: "",
    });
    setImgUrl(null);
    setButtonMenu(false);
  }

  function clearAllEdit() {
    setUserInputEdit({
      title: "",
      author: "",
      content: "",
    });
    setImgUrlEdit(null);
    setButtonMenu(false);
  }

  const addBlog = () => {
    console.log(imgUrl);
    const form = new FormData();
    form.append("title", userInputAdd.title);
    form.append("author", userInputAdd.author);
    form.append("content", userInputAdd.content);
    form.append("imgUrl", imgUrl);

    // // inspect values
    // for (var pair of form.entries()) {
    //   console.log(pair[0]+ ' - ' + pair[1]);
    // }

    dispatch(createBlog(form)).then(() => {
      console.log(error, "ini di detail page");
      if (error === null) {
        closeModalAddBlog();
        clearAll();
        toHomePage();
      }
      dispatch(setLoading(false));
    });
  };

  const editBlogHandle = () => {
    if (!imgUrlEdit) {
      const formEdit = new FormData();
      formEdit.append("title", userInputEdit.title);
      formEdit.append("author", userInputEdit.author);
      formEdit.append("content", userInputEdit.content);
      // formEdit.append("imgUrl", imgUrlEdit);
      const data = {
        formEdit,
        id,
      };

      console.log(data);

      dispatch(editBlog(data)).then(() => {
        console.log(error, "ini di detail page");
        if (error === null) {
          closeModalEditBlog();
          clearAllEdit();
          toHomePage();
        }
        dispatch(setLoading(false));
      });
    } else {
      const formEdit = new FormData();
      formEdit.append("title", userInputEdit.title);
      formEdit.append("author", userInputEdit.author);
      formEdit.append("content", userInputEdit.content);
      formEdit.append("imgUrl", imgUrlEdit);

      // // inspect values
      // for (var pair of form.entries()) {
      //   console.log(pair[0]+ ' - ' + pair[1]);
      // }

      const data = {
        formEdit,
        id,
      };

      dispatch(editBlog(data)).then(() => {
        console.log(error, "ini di detail page");
        if (error === null) {
          closeModalEditBlog();
          clearAllEdit();
          toHomePage();
        }
        dispatch(setLoading(false));
      });
    }
  };

  const onChangeInputEdit = (e, key) => {
    // console.log(e, key);
    const newObjEdit = { ...userInputEdit };
    newObjEdit[key] = e.target.value;
    setUserInputEdit(newObjEdit);
  };

  const deleteHandle = () => {
    dispatch(deleteBlogAction(id)).then(() => {
      toHomePage()
      closeModalDelete();
    });
  };

  return (
    <>
      <Transition appear show={deleteBlog} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalDelete}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-blue-200 bg-opacity-50 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-center"
                >
                  Are you sure to delete the blog ?
                </Dialog.Title>
                {isLoading ? (
                  <ReactLoading
                    className="absolute inset-1/2"
                    type="spin"
                    color="#374151"
                  />
                ) : null}

                {error ? (
                  <span className="text-sm text-red-400 w-auto">
                    Something went error, {error.message}
                  </span>
                ) : null}

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={deleteHandle}
                  >
                    Yes, delete!
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={closeModalDelete}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={addNewBlog} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalAddBlog}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-blue-200 bg-opacity-50 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create New Blog
                </Dialog.Title>
                {isLoading ? (
                  <ReactLoading
                    className="absolute inset-1/2"
                    type="spin"
                    color="#374151"
                  />
                ) : null}

                <div class="form-control my-2">
                  <label class="label">
                    <span class="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="blog title.."
                    class="input input-bordered"
                    onChange={(e) => onChangeInputAdd(e, "title")}
                    value={userInputAdd.title}
                  ></input>
                </div>

                <div class="form-control my-2">
                  <label class="label">
                    <span class="label-text">Author</span>
                  </label>
                  <input
                    type="text"
                    placeholder="your name.."
                    class="input input-bordered"
                    onChange={(e) => onChangeInputAdd(e, "author")}
                    value={userInputAdd.author}
                  ></input>
                </div>

                <div class="form-control my-2">
                  <label class="label">
                    <span class="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="content.."
                    class="input input-bordered"
                    onChange={(e) => onChangeInputAdd(e, "content")}
                    value={userInputAdd.content}
                  ></textarea>
                </div>

                <div class="form-control my-2">
                  <label class="label">
                    <span class="label-text">Image</span>
                  </label>
                  <input
                    type="file"
                    className="mb-4"
                    onChange={addImage}
                  ></input>
                </div>

                {error ? (
                  <span className="text-sm text-red-400 w-auto">
                    Something went error, {error.message}
                  </span>
                ) : null}

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={addBlog}
                  >
                    Create
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={closeModalAddBlog}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={editBlogData} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEditBlog}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-blue-200 bg-opacity-50 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Blog data with ID : {blogById.id}
                </Dialog.Title>
                {isLoading ? (
                  <ReactLoading
                    className="absolute inset-1/2"
                    type="spin"
                    color="#374151"
                  />
                ) : null}

                <div class="form-control my-2">
                  <label class="label">
                    <span class="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    value={userInputEdit.title}
                    onChange={(e) => onChangeInputEdit(e, "title")}
                    class="input input-bordered"
                  ></input>
                </div>

                <div class="form-control my-2">
                  <label class="label">
                    <span class="label-text">Author</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => onChangeInputEdit(e, "author")}
                    value={userInputEdit.author}
                    class="input input-bordered"
                  ></input>
                </div>

                <div className="form-control my-2">
                  <label class="label">
                    <span class="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    value={userInputEdit.content}
                    onChange={(e) => onChangeInputEdit(e, "content")}
                    class="input input-bordered"
                  ></textarea>
                </div>

                <div className={`${changeImage ? "hidden" : "mt-5 flex"}`}>
                  <img
                    className="image-edit"
                    src={userInputEdit.imgUrl}
                    alt=""
                  />
                  <button
                    className="bg-gray-300 ml-2 w-5 h-5 rounded flex justify-center items-center hover:bg-gray-600 hover:text-gray-100"
                    onClick={() => setChangeImage(!changeImage)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  className={`${changeImage ? "form-control my-2" : "hidden"}`}
                >
                  <label class="label">
                    <span class="label-text">Image</span>
                  </label>
                  <input
                    type="file"
                    className="mb-4"
                    onChange={editImage}
                  ></input>
                </div>

                {error ? (
                  <span className="text-sm text-red-400 w-auto">
                    Something went error, {error.message}
                  </span>
                ) : null}

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={editBlogHandle}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={() => (
                      setChangeImage(false), closeModalEditBlog()
                    )}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="relative min-h-screen">
        {/* mobile menu bar */}
        <div className="p-4 text-gray-700 flex justify-between sm:hidden">
          <button
            onClick={toHomePage}
            className="p-1 hover:text-gray-800 hover:bg-gray-300 text-gray-100 bg-gray-600 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          <button
            onClick={() => setButtonMenu(!buttonMenu)}
            className="p-1 hover:text-gray-800 hover:bg-gray-300 text-gray-100 bg-gray-600 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* sidebar  */}
        <div
          className={`${
            buttonMenu
              ? "sidebar border-r border-gray-800  bg-gray-600 text-gray-100 w-56 space-y-6 pt-5 px-3 absolute inset-y-0 left-0 transform translate-x-0 transtition duration-200 sm:hidden ease-in-out"
              : "sidebar-inactive bg-gray-600 text-gray-100 w-56 space-y-6 pt-5 px-3 absolute inset-y-0 left-0 transform -translate-x-full transtition duration-200 sm:hidden ease-in-out"
          }`}
        >
          {/* logo  */}
          <Link
            className="bg-gradient-to-r from-green-400 to-blue-500 rounded py-2 text-gray-100 flex justify-center items-center"
            to="/"
          >
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-2xl flex justify-center items-center font-extrabold">
              CLOUDXIER
            </span>
          </Link>

          {/* menu sidebar  */}
          <div className="">
            <button
              className="rounded w-40 text-white mx-4 my-4 py-1 px-2 flex justify-start items-center transition duration-200 border border-gray-800 hover:border-gray-300 text-gray-100 hover:bg-gray-300 hover:text-gray-800"
              onClick={toHomePage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-semibold">Home</span>
            </button>

            <button
              className="rounded w-40 text-white mx-4 my-4 py-1 px-2 flex justify-start items-center transition duration-200 border border-gray-800 hover:border-gray-300 text-gray-100 hover:bg-gray-300 hover:text-gray-800"
              onClick={openModalAddBlog}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">Create Blog</span>
            </button>
          </div>
        </div>

        {/* navbar desktop  */}
        <div className="navbar-desktop hidden border-b border-gray-800 bg-gray-500 text-gray-100 h-14 md:flex justify-between items-center">
          {/* logo  */}
          <Link
            className="bg-gradient-to-r from-green-400 to-blue-500 py-1 px-3 rounded text-gray-100 ml-4 flex justify-center items-center"
            to="/"
          >
            <svg
              className="h-9 w-9"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-2xl flex justify-center items-center font-extrabold">
              CLOUDXIER
            </span>
          </Link>
          <button
            className="mr-4 rounded text-sm text-white py-1 px-4 flex justify-start items-center transition duration-200 border border-gray-800 hover:border-gray-300 text-gray-100 hover:bg-gray-300 hover:text-gray-800"
            onClick={toHomePage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* content  */}
        <div className="sm:flex-1 text-2xl font-bold">
          <div className="py-4 px-4 flex items-center">
            <span>Blog Posts</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span>Featured Blog</span>
          </div>
          {/* cards content  */}
          <div className="flex md:justify-center lg:justify-center md:flex-wrap lg:flex-wrap flex-col md:flex-row lg:flex-row">
            {/* card  */}

            {isLoading ? (
              <ReactLoading
                className="absolute absolute inset-1/2"
                type="spin"
                color="#374151"
              />
            ) : null}

            <div className="card-detail md:mx-20 lg:mx-20 my-3 mx-4">
              {error ? (
                <span className="text-sm text-red-400 w-auto">
                  Something went error, {error.message}
                </span>
              ) : null}
              <div className="main-image-detail flex justify-center">
                <img src={blogById.imgUrl} alt="" className="rounded-md" />
              </div>
              <div className="title-image mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-500 font-extrabold">
                  {blogById.title}
                </span>
                <button className="hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="comment-image-detail mb-24 flex flex-col justify-between items-start">
                <span className="mt-2 text-xs">{blogById.content}</span>
                <div className="w-full flex justify-between">
                  <button
                    class="btn btn-sm mt-5 bg-blue-500 border-blue-500"
                    onClick={openModalEditBlog}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-6 h-6 mr-2 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                    Edit
                  </button>

                  <button
                    class="btn btn-sm mt-5 bg-red-500 border-red-500"
                    onClick={openModalDelete}
                  >
                    Delete
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block w-4 h-4 ml-2 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
