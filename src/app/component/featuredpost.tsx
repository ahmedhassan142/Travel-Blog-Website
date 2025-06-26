 "use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  slug: string;
  author: string;
  image: string;
  views: number;
  createdAt: string;
}

const FeaturedPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{ data: BlogPost[] }>("/api/featurepost")
      .then((response) => {
        console.log("API Response:", response.data.data); // Log the response
        setPosts(response.data.data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request completes
      });
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Featured Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          // Ensure `post.slug` is a valid string
          const slug = `/blogs/${post.slug || "fallback-slug"}`;
          return (
            <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link href="" passHref>
                <span>
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-600">
                      {post.content?.substring(0, 100) || "No content available"}...
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">{post.views} views</span>
                      <span className="text-sm text-blue-500">Read More →</span>
                    </div>
                  </div>
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedPostsPage;