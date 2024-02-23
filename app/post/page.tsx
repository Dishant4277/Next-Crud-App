"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../libs";
import Post from "../components/Post";
import { PostModel } from "../types";
import Link from "next/link";

export default function Posts() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const { data, error, isLoading } = useSWR<any>(`/api/posts`, fetcher);
  useEffect(() => {
    if (data && data.result) {
      console.log(data.result);
      setPosts(data.result);
    }
  }, [data, isLoading]);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  let delete_Post: PostModel["deletePost"] = async (id: number) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const content = await res.json();
    console.log(content);

    if (content) {
      setPosts(
        posts?.filter((post: PostModel) => {
          return post.id !== id;
        })
      );
    }
  };
  return (
    <div className="w-full max-w-7xl m-auto">
      <table className="w-full border-collapse border border-slate-400">
        <caption className="caption-top py-5 font-bold text-green-500 text-2xl">
          List Posts - Counter :
          <span className="text-red-500 font-bold">{posts?.length}</span>
        </caption>

        <caption className=" text-left p-4">
          <span className="italic font-semibold text-lg">
            Create a New Post Here!!
          </span>
          <Link
            href={`/post/create`}
            className="bg-emerald-500 ml-4 p-2  inline-block text-white rounded"
          >
            Create
          </Link>
        </caption>

        <thead>
          <tr className="text-center">
            <th className="border h-12 border-slate-300">ID</th>
            <th className="border border-slate-300">Title</th>
            <th className="border border-slate-300">Status</th>
            <th className="border border-slate-300">Created at</th>
            <th className="border border-slate-300">Modify</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((item: PostModel) => (
              <Post key={item.id} {...item} deletePost={delete_Post} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
