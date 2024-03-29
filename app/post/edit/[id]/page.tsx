"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
export default function PostEdit({ params }: { params: { id: number } }) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const router = useRouter();
  const {
    data: post,
    isLoading,
    error,
  } = useSWR(`/api/posts/${params.id}`, fetcher);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [status, setStatus] = useState<Number>();
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setStatus(post.publish);
    }
  }, [post, isLoading]);
  const updatePost = async (e: any) => {
    e.preventDefault();
    if (title != "" && body != "") {
      const formData = {
        title: title,
        body: body,
        publish: status,
      };
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const content = await res.json();
      console.log(content);

      if (content) {
        router.push("/post");
      }
    }
  };
  if (isLoading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  if (!post) return null;
  return (
    <form className="w-full" onSubmit={updatePost}>
      <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
        Form Add
      </span>
      <div className="w-full py-2">
        <label htmlFor="title" className="text-sm font-bold py-2 block">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full py-2">
        <label htmlFor="body" className="text-sm font-bold py-2 block">
          Content
        </label>
        <textarea
          rows={5}
          name="body"
          id="body"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
          value={body}
          onChange={(e: any) => setBody(e.target.value)}
        />
      </div>
      <div className="w-full py-2">
        <label htmlFor="status" className="text-sm font-bold py-2 block">
          Visibility of Your Post
        </label>
        <select
          id="status"
          name="status"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
          onChange={(e: any) => setStatus(e.target.value)}
          defaultValue={"null"}
          required
        >
          <option value="null" disabled>
            Select
          </option>
          <option value={1}>Public</option>
          <option value={0}>Private</option>
        </select>
      </div>
      <div className="w-full py-2">
        <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
          Submit
        </button>
      </div>
    </form>
  );
}
