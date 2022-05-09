import React from "react";

import bgImage from "../../assets/3.jpg";
import Menu from "./Menu";

const Home = () => {
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
        className="homescreen  m-0 flex flex-col w-screen justify-center  h-screen text-gray-100 "
      >
        <h1 className="text-6xl  mx-auto  md:mx-48 ">
          Everything you need <br />
          <span className="text-[#3B9035]">Delivered now 🚚</span>
        </h1>
      </section>
    </>
  );
};

export default Home;
