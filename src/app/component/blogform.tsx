"use client";
import React, { useState } from "react";
import axios from "axios";

interface BlogFormProps {
  onSuccess: () => void;
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

      onSuccess();
    } catch (error) {
      console.error("Error adding blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl mt-2 mb-0 overflow-y-auto max-h-[calc(100vh-10rem)]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Add a New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            placeholder="hiking-official"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md min-h-[120px]"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            placeholder="Jacob Bernoulli"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Featured Image</label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer shadow-sm hover:shadow-md"
            />
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-300 pointer-events-none transition-all duration-300"></div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            "Publish Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;