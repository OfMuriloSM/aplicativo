// app/posts/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 100)));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
           <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">📸 App Usuários</h1>
        <div className="flex gap-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/posts" className="hover:underline">Posts</Link>
        </div>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Lista de Posts</h1>
      <div className="flex flex-col gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-gray-700 mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
