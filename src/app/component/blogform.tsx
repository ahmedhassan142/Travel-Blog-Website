"use client";
import React, { useState } from "react";
import axios from "axios";

interface BlogFormProps {
  onSuccess: () => void; // Only onSuccess is needed
}

const BlogForm: React.FC<BlogFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);
      formData.append("author", author);
      if (image) {
        formData.append("image", image);
      }

      await axios.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess(); // Call onSuccess after successful submission
    } catch (error) {
      console.error("Error adding blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add a New Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded text-black bg-white"
          required
        />
        <input
          type="text"
          placeholder="Slug (e.g., hiking-official)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border p-2 rounded  text-black bg-white"
          required
        />
        <textarea
          placeholder="Content (e.g., hiking is so beautiful)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded h-24  text-black bg-white"
          required
        />
        <input
          type="text"
          placeholder="Author (e.g., Jacob Bernoulli)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded  text-black bg-white"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
