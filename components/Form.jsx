import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-start p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-left mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
          {type} Prompt
        </span>
      </h1>
      <p className="text-gray-700 text-left mb-6 max-w-md">
        {type === "Create"
          ? "Create and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform."
          : "Edit and update your prompt to keep it fresh and engaging for your audience."}
      </p>
      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="prompt" className="text-gray-600 font-medium mb-2">
            Prompt
          </label>
          <textarea
            id="prompt"
            className="form_textarea w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your prompt here"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="tag" className="text-gray-600 font-medium mb-2">
            Tag{" "}
            <span className="text-sm text-gray-400">(e.g., #product, #webdev, #nlp)</span>
          </label>
          <input
            type="text"
            id="tag"
            className="form_input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a tag for your prompt"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
          />
        </div>

        {/* Buttons Container */}
        <div className="flex items-center justify-end mt-6 space-x-4">
          <Link
            href="/"
            className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </Link>
          <button
            className={`py-2 px-4 rounded-lg text-white font-semibold ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } transition-colors duration-200`}
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
