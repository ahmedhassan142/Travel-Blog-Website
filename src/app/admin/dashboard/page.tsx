"use client";
import { useState } from "react";
import Link from "next/link";
import BlogForm from "../../component/blogform";
import CategoryForm from "../../component/categoryform";
import DestinationForm from "../../../app/component/destinations";

export default function AdminLayout() {
  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showDestinationForm, setShowDestinationForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <Link href="/" className="text-2xl font-bold hover:text-gray-200 transition-all duration-300 hover:scale-105">
          My Blog
        </Link>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Modern Sidebar */}
        <div
          className={`bg-white border-r border-gray-200 p-4 transition-all duration-300 ease-in-out shadow-lg ${
            isSidebarOpen ? "w-full md:w-64" : "w-16"
          }`}
        >
          {/* Toggle Button - Modern */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-6 p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-all duration-300 hover:scale-110 shadow-md flex items-center justify-center mx-auto"
          >
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Sidebar Items */}
          <div className="space-y-2">
            {/* Manage Blog Section */}
            <div className="mb-6">
              <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2 ${!isSidebarOpen && "hidden"}`}>
                Manage Blog
              </h3>
              <Link
                href="/blogs"
                onClick={() => setActiveItem("blogs")}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                  activeItem === "blogs" 
                    ? "bg-indigo-50 text-indigo-600 font-medium shadow-md" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeItem === "blogs" ? "bg-indigo-100" : "bg-gray-100"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                {isSidebarOpen && <span className="ml-3">Blogs</span>}
              </Link>
              <button
                onClick={() => {
                  setShowForm(true);
                  setActiveItem("");
                }}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 w-full mt-2 ${
                  showForm 
                    ? "bg-indigo-50 text-indigo-600 font-medium shadow-md" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={`p-2 rounded-lg ${showForm ? "bg-indigo-100" : "bg-gray-100"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                {isSidebarOpen && <span className="ml-3">Add Blog</span>}
              </button>
            </div>

            {/* Manage Destination Section */}
            <div className="mb-6">
              <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2 ${!isSidebarOpen && "hidden"}`}>
                Manage Destination
              </h3>
              <Link
                href="/"
                onClick={() => setActiveItem("destinations")}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                  activeItem === "destinations" 
                    ? "bg-indigo-50 text-indigo-600 font-medium shadow-md" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeItem === "destinations" ? "bg-indigo-100" : "bg-gray-100"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                {isSidebarOpen && <span className="ml-3">Destinations</span>}
              </Link>
              <button
                onClick={() => {
                  setShowDestinationForm(true);
                  setActiveItem("");
                }}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 w-full mt-2 ${
                  showDestinationForm 
                    ? "bg-indigo-50 text-indigo-600 font-medium shadow-md" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={`p-2 rounded-lg ${showDestinationForm ? "bg-indigo-100" : "bg-gray-100"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                {isSidebarOpen && <span className="ml-3">Add Destination</span>}
              </button>
            </div>

            {/* Manage Categories Section */}
            <div className="mb-6">
              <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2 ${!isSidebarOpen && "hidden"}`}>
                Manage Categories
              </h3>
              <Link
                href="/"
                onClick={() => setActiveItem("categories")}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                  activeItem === "categories" 
                    ? "bg-indigo-50 text-indigo-600 font-medium shadow-md" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeItem === "categories" ? "bg-indigo-100" : "bg-gray-100"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M17 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v3zm-7 3a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                {isSidebarOpen && <span className="ml-3">Categories</span>}
              </Link>
              <button
                onClick={() => {
                  setShowCategoryForm(true);
                  setActiveItem("");
                }}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 w-full mt-2 ${
                  showCategoryForm 
                    ? "bg-indigo-50 text-indigo-600 font-medium shadow-md" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className={`p-2 rounded-lg ${showCategoryForm ? "bg-indigo-100" : "bg-gray-100"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                {isSidebarOpen && <span className="ml-3">Add Category</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-white rounded-tl-3xl md:rounded-tl-none shadow-inner">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Cards */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Quick Stats</h2>
              <p className="text-gray-600">Welcome to your admin dashboard!</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Recent Activity</h2>
              <p className="text-gray-600">Check your latest updates here.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">Notifications</h2>
              <p className="text-gray-600">You have no new notifications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modals */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-full p-1 w-8 h-8 flex items-center justify-center shadow-md"
            >
              ✖
            </button>
            <BlogForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {showCategoryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <button
              onClick={() => setShowCategoryForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-full p-1 w-8 h-8 flex items-center justify-center shadow-md"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Category</h2>
            <CategoryForm onSuccess={() => setShowCategoryForm(false)} />
          </div>
        </div>
      )}

      {showDestinationForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <button
              onClick={() => setShowDestinationForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-full p-1 w-8 h-8 flex items-center justify-center shadow-md"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Destination</h2>
            <DestinationForm onSuccess={() => setShowDestinationForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}