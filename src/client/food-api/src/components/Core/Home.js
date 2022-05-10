import React from "react";

import bgImage from "../../assets/3.jpg";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <>
      <Menu />
      <section
        style={{
          backgroundImage: `linear-gradient(to right bottom, #00000080 , #00000080),url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: 600,

          width: 600,
        }}
        className=" relative font-Merriweather font-normal  m-0 flex flex-col w-[100%] justify-center  h-screen text-gray-100 "
      >
        <h1 className="text-6xl  mx-auto  md:mx-48 md:absolute md:top-[20%] ">
          Everything you need <br />
          <span className="text-[#3B9035]">Delivered now 🚚</span>
        </h1>
        <button
          onClick={() => {
            history.push("/home");
          }}
          style={{
            background: `linear-gradient(90deg, rgba(3,47,142,1) 0%, rgba(59,144,53,1) 100%)`,
          }}
          className=" mx-auto mt-20 text-center opacity-90 hover:translate-y-2 delay-150 hover:opacity-100 text-white font-bold rounded-full py-2 w-2/12 focus:outline-none border-2 border-[#3B9035]"
        >
          Make Order
        </button>
      </section>
    </>
  );
};

export default Home;
