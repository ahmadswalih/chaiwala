import React, { useEffect, useState } from "react";
import ResultCard from "../components/ResultCard";
import Tags from "../components/Tags";
import logo from "../assets/logo.png";
import jsonData from "../data/data.json";
import { Link } from "react-router-dom";
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
  useEffect(() => {
    GenerateRandom();
  }, []);

  const searchResult = async () => {
    if (tag !== "") {
      try {
        setLoading(true);
        const filteredQuotes = jsonData.filter((quote) =>
          quote.tags
            .map((tag) => tag.toLowerCase().trim())
            .includes(tag.toLowerCase().trim())
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
        <div>
          <img
            src={logo}
            alt="OOPPSSS.. logo goes here "
            className=" w-60 md:w-48 drop-shadow-md "
            srcset=""
          />
        </div>

        <p className=" text-4xl md:text-6xl font-bold mt-3 ">चायवाला </p>
        <p className="mt-1   md:mt-8 text-md w-[75%] md:w-[40%]  text-center md:text-xl text-gray-600">
          The application will list the craziest things that said by PM Narendra
          Modi in public Platforms. All data in the site is scraped from
          internet.{" "}
        </p>
        <div className="flex md:flex-row flex-col mt-10">
          <input
            onChange={(e) => {
              SetTag(e.target.value);
            }}
            required
            value={tag}
            placeholder="eg: Climate,Sarcasm , etc..."
            type="text"
            className="rounded-md border border-gray-400 focus:outline-none p-4 shadow-md text-xl w-[24rem]  md:w-[28rem] h-12 "
          />
          <button
            type="submit"
            onClick={searchResult}
            className="bg-red-700 hover:bg-red-400 ml-3 mt-2 md:mt-0 text-white font-bold py-2 px-4 border border-red-500 rounded"
          >
            Search
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
        <p className="mt-4 text-center  text-gray-600 text-sm  md:text-lg">
          By using this website , You are accepting our{" "}
          <a href="#terms-and-conditions">
            {" "}
            <span className="text-blue-500 underline">Terms & Conditions </span>
          </a>
        </p>

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
        {error ? (
          <p className="text-red-600">
            There is no Quote available for this tag
          </p>
        ) : (
          ""
        )}

        {randomQuotes ? (
          <>
            <div className="flex">
              <p className=" text-4xl mt-8 md:-mb-8  font-handwritten">
                Random DUMBBB
              </p>
              {/* <img src={arrowPng} className="w-8 mt-8" alt="arrowPng" /> */}
            </div>
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
        {result.length > 0 ? (
          ""
        ) : (
          <div className="flex flex-col w-full items-center">
            {/* <ResultCard
              date={randomQuotes.appeared_at}
              quote={randomQuotes.value}
              source_url={randomQuotes._embedded.source[0].url}
              tag={randomQuotes.tags[0]}
            /> */}
            <button
              onClick={GenerateRandom}
              type="submit"
              className="bg-orange-400 hover:bg-red-400 ml-3 text-white font-bold py-2 px-4 border border-red-500  md:w-1/5 mt-1 justify-center items-center rounded"
            >
              Get Randome Dumbb
            </button>
          </div>
        )}

        <Tags />
        <div className="flex mt-4 ">
          <a target="_blank" href="https://github.com/ahmadswalih/chaiwala">
            {" "}
            <p className=" border hover:bg-blue-200 mr-2 border-gray-400  text-gray-600 rounded-md p-2 text-lg mb-4">
              Github ➚{" "}
            </p>
          </a>
          <a target="_blank" href="https://forms.gle/wPFDG26Xc4EQeuvU7">
            {" "}
            <p className="border border-gray-500 hover:bg-blue-200 text-gray-600 rounded-md p-2 text-lg mb-4">
              Contribute ➚{" "}
            </p>
          </a>
        </div>
        <a target="_blank" href="https://trumplaughs.ahmadswalih.com">
          {" "}
          <p className="bg-green-500 mt-3 text-white rounded-md p-2 text-xl mb-4">
            TrumpLaughs ➚{" "}
          </p>
        </a>
        <a
          target="_blank"
          href="https://us.umami.is/share/koQqwa0aKCrAt530/chaiwala.ahmadswalih.com"
        >
          <p className="mt-4 text-gray-600 ">Analytics ➚</p>
        </a>

        <div className="flex mt-3 ">
          <a
            className="mt-0 mb-4 text-gray-600"
            href="https://dribbble.com/sarkartoon"
          >
            Logo courtesy <span className="text-red-700"> Sarkartoon</span>
          </a>
          <Link to="/terms-conditions">
            {" "}
            <p className="text-gray-600 ml-4 hover:text-blue-500  text-center ">
              Terms and conditions
            </p>
          </Link>
        </div>
        <a target="_blank" href="https://ahmadswalih.com">
          <p className=" mb-4 text-gray-600 ">© ahmadswalih.com</p>
        </a>
      </div>
    </div>
  );
};
export default App;
