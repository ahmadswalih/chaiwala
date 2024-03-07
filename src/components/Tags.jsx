import React from "react";
import jsonData from "../data/data.json";

const Tags = () => {
  // Extract tags from JSON data
  const tags = jsonData.map((quote) => quote.tags).flat();
  // Remove duplicates from tags array
  const uniqueTags = [...new Set(tags)];

  return (
    <div className="rounded-md shadow-md mt-16 flex flex-col justify-center items-center md:items-start w-full max-w-[34rem] overflow-hidden bg-white">
      <p className="text-center md:text-left m-2 text-gray-700 mt-3">
        Expected Search Keywords:
      </p>
      <div className="flex flex-wrap p-4 gap-2">
        {uniqueTags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm flex items-center"
          >
            <span className="mr-1">#</span>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
