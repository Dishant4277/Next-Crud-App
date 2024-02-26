"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function PostCreate() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [status, setStatus] = useState<Number>();
  const addPost = async (e: any) => {
    e.preventDefault();
    if (title != "" && body != "" && status != null) {
      const formData = {
        title: title,
        body: body,
        publish: status,
      };
      const add = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const content = await add.json();

      if (content) {
        router.push("/post");
      }
    }
  };
  return (
    <form className="w-full" onSubmit={addPost}>
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
          onChange={(e: any) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="w-full py-2">
        <label htmlFor="body" className="text-sm font-bold py-2 block">
          Content
        </label>
        <textarea
          id="body"
          rows={5}
          name="body"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
          onChange={(e: any) => setBody(e.target.value)}
          required
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
