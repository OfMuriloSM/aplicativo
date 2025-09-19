"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  name: string;
  photo: string;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!name || !file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      setUsers([...users, { name, photo: data.url }]);
      setName("");
      setFile(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 max-w-10xl mx-auto p-8">
      {/* 🔹 Navbar */}
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md rounded-xl">
        <h1 className="text-2xl font-bold">📸 App Usuários</h1>
        <div className="flex gap-6">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/posts" className="hover:underline">Posts</Link>
        </div>
      </nav>

      {/* 🔹 Conteúdo */}
      <div className="mt-8 flex flex-col gap-10">
        {/* Formulário */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Adicionar novo usuário</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="flex-1 text-sm text-gray-500"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Lista de usuários */}
        {users.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6">Usuários cadastrados</h2>
            <div className="flex flex-col gap-6">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 border-b pb-4 last:border-none"
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-600 shadow"
                  />
                  <span className="text-lg font-medium">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
