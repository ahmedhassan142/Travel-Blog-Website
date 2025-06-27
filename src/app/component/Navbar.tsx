"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiArrowDropDownLine, RiSearchLine, RiCloseLine, RiDashboardLine } from 'react-icons/ri';
import axios from 'axios';
import CategoryForm from './categoryform';
import DestinationForm from './destinations';

type Category = {
  _id: string;
  name: string;
  slug: string;
  description: string;
};

type Blog = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
};

type Destination = {
  _id: string;
  name: string;
  slug: string;
  content: string;
};

type SearchResult = {
  blogs: Blog[];
  categories: Category[];
  destinations: Destination[];
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    categories: false,
    blog: false,
    destinations: false,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showDestinationForm, setShowDestinationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/category');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDestinations = async () => {
    try {
      const response = await axios.get('/api/destinations');
      setDestinations(response.data.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`/api/search?query=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
      setSearchResults(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
    fetchDestinations();
  }, []);

  const handleMouseEnter = (key: keyof typeof isDropdownOpen) =>
    setIsDropdownOpen((prev) => ({ ...prev, [key]: true }));

  const handleMouseLeave = (key: keyof typeof isDropdownOpen) =>
    setIsDropdownOpen((prev) => ({ ...prev, [key]: false }));

  return (
    <nav className="navbar z-50">
      <div className="logo mx-20">
        <Link href="/">
          <span className="logo-content">
            <span>Travel Blog</span>
          </span>
        </Link>
      </div>
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link href="/">
            <span>HOME</span>
          </Link>
        </li>

        {/* CATEGORIES */}
        <li
          onMouseEnter={() => handleMouseEnter('categories')}
          onMouseLeave={() => handleMouseLeave('categories')}
        >
          <div className="dropdown">
            <span className="dropdown-link">
              <span>CATEGORIES</span>
              <RiArrowDropDownLine className="dropdown-icon" />
            </span>
            {isDropdownOpen.categories && (
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link href={`/category/${category.slug}`}>
                      <span>{category.name.toUpperCase()}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setShowCategoryForm(!showCategoryForm)}
                  >
                    {showCategoryForm ? 'Cancel' : 'Add Category'}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </li>

        {/* BLOG */}
        <li
          onMouseEnter={() => handleMouseEnter('blog')}
          onMouseLeave={() => handleMouseLeave('blog')}
        >
          <div className="dropdown">
            <span className="dropdown-link">
              BLOG <RiArrowDropDownLine className="dropdown-icon" />
            </span>
            {isDropdownOpen.blog && (
              <ul className="dropdown-menu">
                {loading ? (
                  <p>loading</p>
                ) : (
                  Array.isArray(blogs) &&
                  blogs.map((blog) => (
                    <li key={blog._id}>
                      <Link href={`/blogs/${blog.slug}`}>
                        <span>{blog.title.toUpperCase()}</span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </li>

        {/* DESTINATIONS */}
        <li
          onMouseEnter={() => handleMouseEnter('destinations')}
          onMouseLeave={() => handleMouseLeave('destinations')}
        >
          <div className="dropdown">
            <span className="dropdown-link">
              DESTINATIONS <RiArrowDropDownLine className="dropdown-icon" />
            </span>
            {isDropdownOpen.destinations && (
              <ul className="dropdown-menu">
                {destinations.map((destination) => (
                  <li key={destination._id}>
                    <Link href={`/destinations/${destination.slug}`}>
                      <span>{destination.name.toUpperCase()}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setShowDestinationForm(!showDestinationForm)}
                  >
                    {showDestinationForm ? 'Cancel' : 'Add Destination'}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </li>

        {/* ABOUT & CONTACT */}
        <li>
          <Link href="/About">
            <span>ABOUT</span>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <span>CONTACT</span>
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {/* Dashboard Button */}
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-500 ml-6">
          <RiDashboardLine className="text-xl" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        {/* Search Bar - Simple version that appears inline */}
        {showSearch ? (
          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                type="button"
                className="mr-6 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                  setSearchResults(null);
                }}
              >
                <RiCloseLine size={20} />
              </button>
            </form>
            
            {/* Simple search results dropdown */}
            {searchResults && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.blogs.length > 0 && (
                  <div className="p-2 border-b">
                    <h3 className="font-bold text-sm mb-1">Blogs</h3>
                    <ul>
                      {searchResults.blogs.map((blog) => (
                        <li key={blog._id} className="py-1 hover:bg-gray-100">
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="block px-2"
                            onClick={() => setShowSearch(false)}
                          >
                            {blog.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {searchResults.categories.length > 0 && (
                  <div className="p-2 border-b">
                    <h3 className="font-bold text-sm mb-1">Categories</h3>
                    <ul>
                      {searchResults.categories.map((category) => (
                        <li key={category._id} className="py-1 hover:bg-gray-100">
                          <Link
                            href={`/category/${category.slug}`}
                            className="block px-2"
                            onClick={() => setShowSearch(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {searchResults.destinations.length > 0 && (
                  <div className="p-2">
                    <h3 className="font-bold text-sm mb-1">Destinations</h3>
                    <ul>
                      {searchResults.destinations.map((destination) => (
                        <li key={destination._id} className="py-1 hover:bg-gray-100">
                          <Link
                            href={`/destinations/${destination.slug}`}
                            className="block px-2"
                            onClick={() => setShowSearch(false)}
                          >
                            {destination.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {searchResults.blogs.length === 0 &&
                  searchResults.categories.length === 0 &&
                  searchResults.destinations.length === 0 && (
                    <div className="p-2 text-center text-sm">No results found</div>
                  )}
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => setShowSearch(true)}
            className="text-gray-700 hover:text-blue-500 mr-6"
          >
            <RiSearchLine className="text-xl" />
          </button>
        )}
      </div>

      {/* Category Form */}
      {showCategoryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCategoryForm(false)}
            >
              <RiCloseLine size={24} />
            </button>
            <CategoryForm
              onSuccess={() => {
                fetchCategories();
                setShowCategoryForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Destination Form */}
      {showDestinationForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowDestinationForm(false)}
            >
              <RiCloseLine size={24} />
            </button>
            <DestinationForm
              onSuccess={() => {
                fetchDestinations();
                setShowDestinationForm(false);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;