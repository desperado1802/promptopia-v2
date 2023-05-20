"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or prompt"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        searchText={searchText}
        setSearchText={setSearchText}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;

const PromptCardList = ({ data, handleTagClick, searchText }) => {
  const filteredPosts = data.filter((post) => {
    return post.prompt.includes(searchText) || post.tag.includes(searchText);
  });

  return (
    <div className="mt-16 prompt_layout">
      {filteredPosts.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
