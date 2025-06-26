"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RiArrowDropDownLine, RiSearchLine } from 'react-icons/ri';
import { FaPlane } from 'react-icons/fa';
import axios from 'axios';
import BlogForm from './blogform';
import CategoryForm from './categoryform';
import DestinationForm from './destinations';

type Category = {
  _id: string;
  name: string;
  slug: string;
  description:string;
};

type Blog = {
  _id: string;
  title: string;
  slug: string;
  content:string;
  author:string;
};

type Destination = {
  _id: string;
  name: string;
  slug: string;
  content:string;
};

const Navbar: React.FC = () => {
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
  const[loading,setloading]=useState(true)

  // Fetch initial data
  // useEffect(() => {
  //   fetchCategories();
  //   fetchBlogs();
  //   fetchDestinations();
  // }, []);

  // Fetch categories
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/category');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }finally{
      setloading(false)
    }
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }finally{
      setloading(false)
    }
  };
 

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      const response = await axios.get('/api/destinations');
      setDestinations(response.data.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }finally{
      setloading(false)
    }
  };
  useEffect(()=>{
    fetchBlogs()
    fetchCategories()
    fetchDestinations()
  },[])

  // Handle dropdown hover
  const handleMouseEnter = (key: keyof typeof isDropdownOpen) =>
    setIsDropdownOpen((prev) => ({ ...prev, [key]: true }));

  const handleMouseLeave = (key: keyof typeof isDropdownOpen) =>
    setIsDropdownOpen((prev) => ({ ...prev, [key]: false }));

  return (
    <nav className="navbar">
      <div className="logo mx-20">
        <Link href="/">
          <span className="logo-content">
            {/* <FaPlane className="logo-icon" /> */}
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
                {loading ? (<p>loading</p>):(Array.isArray(blogs) &&  blogs.map((blog) => (
                  <li key={blog._id}>
                    <Link href={`/blogs/${blog.slug}`}>
                      <span>{blog.title.toUpperCase()}</span>
                    </Link>
                  </li>
                )))}
                <li>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setShowBlogForm(!showBlogForm)}
                  >
                    {showBlogForm ? 'Cancel' : 'Add Blog'}
                  </button>
                </li>
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

      <div className="search-icon">
        <RiSearchLine className="icon" />
      </div>

      {/* Category Form */}
      {showCategoryForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <CategoryForm
        onSuccess={() => {
          fetchCategories();
          setShowCategoryForm(false);
        }}
      />
    </div>
  </div>
)}

      {/* Blog Form */}
      {/* {showBlogForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <BlogForm
        onSuccess={() => {
          fetchBlogs();
          ;
        }}
        onClose={()=>{
          setShowBlogForm(false)
        }}
      />
    </div>
  </div>
)} */}

      {/* Destination Form */}
      {showDestinationForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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



