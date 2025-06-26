"use client";
import { useState } from "react";
import Link from "next/link";
import BlogForm from "../../component/blogform"; // Ensure the correct path to BlogForm
import CategoryForm from "../../component/categoryform"; // Ensure the correct path to CategoryForm
import DestinationForm from "../../../app/component/destinations";// Ensure the correct path to DestinationForm

export default function AdminLayout() {
  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showDestinationForm, setShowDestinationForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-lg">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
          My Blog
        </Link>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-16"
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {isSidebarOpen ? "◄" : "►"}
          </button>

          {/* Manage Blog Section */}
          <div className="mb-6">
            <h3 className={`text-sm font-semibold mb-2 ${!isSidebarOpen && "hidden"}`}>
              Manage Blog
            </h3>
            <Link
              href="/admin/blogs"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="mr-2">📝</span>
              {isSidebarOpen && <span>Blogs</span>}
            </Link>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors w-full"
            >
              <span className="mr-2">➕</span>
              {isSidebarOpen && <span>Add Blog</span>}
            </button>
          </div>

          {/* Manage Destination Section */}
          <div className="mb-6">
            <h3 className={`text-sm font-semibold mb-2 ${!isSidebarOpen && "hidden"}`}>
              Manage Destination
            </h3>
            <Link
              href="/admin/destinations"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="mr-2">🌍</span>
              {isSidebarOpen && <span>Destinations</span>}
            </Link>
            <button
              onClick={() => setShowDestinationForm(true)}
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors w-full"
            >
              <span className="mr-2">➕</span>
              {isSidebarOpen && <span>Add Destination</span>}
            </button>
          </div>

          {/* Manage Categories Section */}
          <div className="mb-6">
            <h3 className={`text-sm font-semibold mb-2 ${!isSidebarOpen && "hidden"}`}>
              Manage Categories
            </h3>
            <Link
              href="/admin/categories"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="mr-2">📂</span>
              {isSidebarOpen && <span>Categories</span>}
            </Link>
            <button
              onClick={() => setShowCategoryForm(true)}
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors w-full"
            >
              <span className="mr-2">➕</span>
              {isSidebarOpen && <span>Add Category</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the admin dashboard!</p>
        </div>
      </div>

      {/* BlogForm Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <BlogForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* CategoryForm Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={() => setShowCategoryForm(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Add a New Category</h2>
            <CategoryForm onSuccess={() => setShowCategoryForm(false)} />
          </div>
        </div>
      )}

      {/* DestinationForm Modal */}
      {showDestinationForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={() => setShowDestinationForm(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Add a New Destination</h2>
            <DestinationForm onSuccess={() => setShowDestinationForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}