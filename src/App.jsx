import React, { useState } from "react";
import ResultCard from "./components/ResultCard";
import Tags from "./components/Tags";
import logo from "./assets/logo.png";
import jsonData from "./data/data.json";

const App = () => {
  const [result, SetResult] = useState([]);
  const [tag, SetTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomQuotes, SetRandomQuotes] = useState();
  const [error, setError] = useState(false);
  const GenerateRandom = async () => {
    try {
      setLoading(true);
      const randomIndex = Math.floor(Math.random() * jsonData.length);

      const randomQuote = jsonData[randomIndex];

      SetRandomQuotes(randomQuote);
      console.log(randomQuotes);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const searchResult = async () => {
    if (tag !== "") {
      try {
        setLoading(true);
        const filteredQuotes = jsonData.filter((quote) =>
          quote.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase())
        );
        if (filteredQuotes.length > 0) {
          SetResult(filteredQuotes);
          setError(false);
          SetRandomQuotes();
          console.log(result);
        } else {
          setError(true);
          console.log("No quotes found for the provided tag.");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Enter Some great keyword  man");
    }
  };

  return (
    <div className=" overflow-x-hidden absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="flex flex-col justify-center items-center  ">
        <img
          src={logo}
          alt="OOPPSSS.. logo goes here "
          className=" w-72 md:w-96 drop-shadow-md "
          srcset=""
        />
        <p className=" text-4xl md:text-6xl font-bold mt-3 ">चायवाला </p>
        <p className="mt-2 md:mt-8 text-md w-[75%]  text-center md:text-xl text-gray-600">
          The application will list the greatest things said by{" "}
          <span className="font-bold"> चायवाला</span>.
        </p>
        <div className="flex md:flex-row flex-col mt-10">
          <input
            onChange={(e) => {
              SetTag(e.target.value);
            }}
            required
            value={tag}
            placeholder="eg: Climate,Religion , etc..."
            type="text"
            className="rounded-md border border-gray-400 focus:outline-none p-4 shadow-md text-xl w-[24rem]  md:w-[28rem] h-12 "
          />
          <button
            type="submit"
            onClick={searchResult}
            className="bg-red-700 hover:bg-red-400 ml-3 mt-2 md:mt-0 text-white font-bold py-2 px-4 border border-red-500 rounded"
          >
            Get A Chai!
          </button>

          {result.length > 0 || randomQuotes ? (
            <button
              type="submit"
              onClick={() => {
                SetResult([]);
                SetTag("");
                SetRandomQuotes();
              }}
              className="bg-green-500 hover:bg-green-400 ml-3 mt-2 md:mt-0 text-white font-bold py-2 px-4 border border-green-500 rounded"
            >
              clear
            </button>
          ) : (
            ""
          )}
        </div>
        {result.length > 0 ? (
          ""
        ) : (
          <button
            onClick={GenerateRandom}
            type="submit"
            className="bg-orange-400 hover:bg-red-400 ml-3 text-white font-bold py-2 px-4 border border-red-500  md:w-1/5 mt-8 justify-center items-center rounded"
          >
            Get a Random CHAI by CHAIWALA
          </button>
        )}

        {loading ? (
          <div className="flex mt-10 items-center space-x-2">
            <div aria-label="Loading..." role="status">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin w-6 h-6 stroke-slate-500"
              >
                <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
              </svg>
            </div>
            <span className="text-md font-medium text-slate-500">
              Searchingggg...
            </span>
          </div>
        ) : (
          ""
        )}
        {error ? <p>There is no Quote available for this tag</p> : ""}

        {randomQuotes ? (
          <>
            <ResultCard
              date={randomQuotes.appeared_at}
              quote={randomQuotes.value}
              source_url={randomQuotes._embedded.source[0].url}
              tag={randomQuotes.tags[0]}
            />
          </>
        ) : (
          ""
        )}
        {result == ""
          ? ""
          : result.map((quote) => (
              <div className="mt-7 md:mt-0">
                <ResultCard
                  key={quote.quote_id}
                  quote={quote.value}
                  date={quote.appeared_at}
                  source_url={quote._embedded.source[0].url}
                  tag={quote.tags[0]}
                />
              </div>
            ))}
        <Tags />

        <a
          target="_blank"
          href="https://us.umami.is/share/DTJgMGKtPwcQcCiG/trumplaughs.ahmadswalih.com"
        >
          <p className="mt-4 text-gray-600 ">Analytics ➚</p>
        </a>
        <a target="_blank" href="https://ahmadswalih.com">
          <p className="mt-4 mb-4 text-gray-600 ">© ahmadswalih.com</p>
        </a>
        <a
          className="mt-0 mb-4 text-gray-600"
          href="https://dribbble.com/sarkartoon"
        >
          Logo courtesy <span className="text-red-700"> Sarkartoon</span>
        </a>
      </div>
    </div>
  );
};
export default App;
