import React, { useState, Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";


export default function CardBlog({item}) {
  const history = useHistory();

  const toDetailPage = () => history.push(`/detail-blog/${item.id}`);

  return (
    <div className="card rounded-md md:mx-20 lg:mx-20 my-3 mx-4">
      <div
        className="main-image cursor-pointer flex justify-center"
        onClick={toDetailPage}
      >
        <img
          src={item.imgUrl}
          alt=""
          className="rounded-md"
        />
      </div>
      <div className="title-image flex justify-between items-center">
        <span className="text-sm text-gray-500 font-extrabold">
          {item.title}
        </span>
        <button className="hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
      <div className="comment-image flex justify-between items-center">
        <span className="text-xs">{item.comment} comments</span>
        <span className="text-xs">by {item.author}</span>
      </div>
    </div>
  );
}
