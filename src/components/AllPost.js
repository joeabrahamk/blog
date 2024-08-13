import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  SanityClient  from '../client'; 

const AllPosts = () => {
  const [allPostsData, setAllPostsData] = useState(null);

  useEffect(() => {
    console.log("Fetching posts...");
    SanityClient.fetch(`*[_type == "post"]{
      title,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      }
    }`)
    .then(data => {
      console.log("Fetched data:", data);
      setAllPostsData(data);
    })
    .catch(err => {
      console.error("Error fetching data:", err);
    });
  }, []);

  useEffect(() => {
    console.log("allPostsData updated:", allPostsData);
  }, [allPostsData]);

  return (
    <div className="bg-black min-h-screen p-12">
      <div className="container mx-auto">
        <h2 className="text-white text-5xl flex justify-center cursive">Blog Posts Page</h2>
        <h3 className="text-lg text-gray-600 flex justify-center mb-12">Welcome to my page of blog posts</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPostsData ? (
            allPostsData.map((post, index) => (
              <article key={index}>
                <a href={"/post/" + post.slug.current} key={post.slug.current}>
                  <span className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-green-400">
                    <img src={post.mainImage.asset.url} alt={post.title} className="w-full h-full rounded-r object-cover absolute" />
                    <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                      <h2 className="text-gray-800 text-lg font-bold px-3 py-4 bg-blue-700 text-blue-100 bg-opacity-75 rounded">{post.title}</h2>
                    </span>
                  </span>
                </a>
              </article>
            ))
          ) : (
            <p>Loading posts...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;