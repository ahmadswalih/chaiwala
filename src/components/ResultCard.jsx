import React from "react";

const ResultCard = ({ quote, date, source_url, tag }) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div class="overflow-hidden overflow-x-hidden">
      <section class="container whitespace-normal  justify-center items-center mx-auto p-5 md:p-10 md:pt-10 transform duration-500">
        <article class="flex flex-wrap bg-blue-100 rounded-md shadow-lg mx-auto max-w-96  md:max-w-xl">
          <div class="p-5 md:p-10 my-auto w-full md:w-auto">
            <h1 class="text-xl font-semibold text-gray-800">{quote}</h1>
            <p class="text-base text-gray-600 mt-2">
              appeared at: {formattedDate}
            </p>
            <p class="text-gray-600 overflow-hidden ">
              source:{" "}
              <a class="text-blue-700 " target="_blank" href={source_url}>
                {source_url}
              </a>{" "}
            </p>
            <p class="mt-2 text-gray-400">#{tag}</p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ResultCard;
