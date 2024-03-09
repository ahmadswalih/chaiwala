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
        <img
          src={logo}
          alt="OOPPSSS.. logo goes here "
          className=" w-60 md:w-72 drop-shadow-md "
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
            placeholder="eg: Climate,Sarcasm , etc..."
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
        <p className="mt-4 text-center  text-gray-600 text-sm  md:text-lg">
          By using this website , You are accepting our{" "}
          <a href="#terms-and-conditions">
            {" "}
            <span className="text-blue-500 underline">Terms & Conditions </span>
          </a>
        </p>
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
        {error ? (
          <p className="text-red-600">
            There is no Quote available for this tag
          </p>
        ) : (
          ""
        )}

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
        <a target="_blank" href="https://github.com/ahmadswalih/chaiwala">
          {" "}
          <p className="bg-red-500 mt-3 text-white rounded-md p-2 text-xl mb-4">
            GITHUB ➚{" "}
          </p>
        </a>
        <a target="_blank" href="https://forms.gle/wPFDG26Xc4EQeuvU7">
          {" "}
          <p className="bg-green-500 text-white rounded-md p-2 text-xl mb-4">
            Contribute a Great Thing ➚{" "}
          </p>
        </a>
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
        <a target="_blank" href="https://ahmadswalih.com">
          <p className="mt-4 mb-4 text-gray-600 ">© ahmadswalih.com</p>
        </a>
        <a
          className="mt-0 mb-4 text-gray-600"
          href="https://dribbble.com/sarkartoon"
        >
          Logo courtesy <span className="text-red-700"> Sarkartoon</span>
        </a>

        <div
          id="terms-and-conditions"
          className="flex items-center flex-col md:w-[44rem] p-3 rounded-md mb-10 shadow-md bg-gray-100 border border-gray-200"
        >
          <p className="text-red-600 text-xl mb-2 text-center font-bold">
            Terms and conditions
          </p>
          <p className=" text-center">
            Terms and Conditions These Terms and Conditions govern your use of
            the website https://chaiwala.ahmadswalih.com, an open-source project
            dedicated to compiling and displaying statements made by Prime
            Minister Narendra Modi in public platforms. By accessing or using
            the website, you agree to abide by these Terms and Conditions. If
            you do not agree with any part of these terms, please refrain from
            using the website. Ownership of Data: The data displayed on the
            website is sourced from the internet and is not owned by us. We do
            not claim ownership of the content displayed. If you believe that
            any content infringes on your legal rights or copyright, please
            contact us immediately, and we will take the necessary actions to
            address the issue. Legal Compliance: We are committed to complying
            with all applicable laws and regulations. If any legal or copyright
            issues arise regarding the content displayed on the website, we will
            cooperate fully with relevant authorities and stakeholders to
            resolve the matter promptly and appropriately. Content will be
            removed if it is proven to be inaccurately attributed to Prime
            Minister Narendra Modi or lacks proper authorization. Direct
            Communication: Users or individuals with concerns about the website
            are encouraged to contact us directly through email at [insert email
            address]. We value open communication and are committed to
            addressing any issues promptly and transparently. Non-Defamation and
            Non-Harassment: The purpose of this website is to provide a platform
            for information dissemination and public discourse. We do not
            endorse or condone any form of defamation or harassment against
            individuals or entities mentioned on the website. Users are
            prohibited from using the website to engage in defamatory,
            harassing, or unlawful activities. Political Neutrality: The website
            maintains a stance of political neutrality and impartiality. We do
            not have any affiliations or connections with any political parties,
            organizations, or individuals. The content displayed on the website
            is presented objectively and without bias. User Conduct: Users of
            the website are expected to conduct themselves in a respectful and
            lawful manner. Any misuse of the website, including but not limited
            to unauthorized access, data manipulation, or dissemination of
            offensive content, is strictly prohibited. We reserve the right to
            suspend or terminate user accounts found to be in violation of these
            Terms and Conditions. Disclaimer of Warranties: While we strive to
            provide accurate and up-to-date information, we make no warranties
            or representations regarding the accuracy, reliability, or
            completeness of the content displayed on the website. Users access
            the website at their own risk and discretion. Limitation of
            Liability: In no event shall we be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in
            any way connected with the use of the website or the inability to
            use the website, even if we have been advised of the possibility of
            such damages. Modification of Terms: We reserve the right to modify
            or update these Terms and Conditions at any time without prior
            notice. By continuing to use the website after such changes are
            made, you acknowledge and agree to be bound by the revised terms.
            Governing Law: These Terms and Conditions shall be governed by and
            construed in accordance with the laws of right to speech. Any
            disputes arising out of or relating to these terms shall be subject
            to the exclusive jurisdiction of the courts in right to act and
            right to speech. Contact Information: If you have any questions or
            concerns about these Terms and Conditions, please contact us at
            ahmadswalih777@gmail.com. By using this website, you acknowledge
            that you have read, understood, and agree to be bound by these Terms
            and Conditions. Thank you for your cooperation and understanding.
          </p>
        </div>
      </div>
    </div>
  );
};
export default App;
