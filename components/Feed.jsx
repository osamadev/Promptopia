"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardsList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [prompts, setPrompts] = useState([]);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleTagClick = async (tag) => {
    console.log(tag);
  };

  useEffect(() => {
    fetch("/api/prompt")
      .then((response) => response.json())
      .then((data) => {
        setPrompts(data);
      });
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          name="searchPrompts"
          value={searchKeyword}
          onChange={handleSearch}
          required
          placeholder="Search for prompts"
          className="search_input peer"
        />
      </form>
      <PromptCardsList data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
