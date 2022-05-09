import React from "react";
import auth from "../../auth/auth-helper";
import Moment from "react-moment";
import Avatar from "react-avatar";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const name = auth.isAuthenticated().user.name;
  let history = useHistory();

  const createdAt = auth.isAuthenticated().user.createdAt;

  return (
    <div className="bg-slate-900 h-[100vh] relative font-Merriweather ">
      <button
        onClick={history.goBack}
        className="text-black bg-white rounded-full mb-8 md:absolute md:left-[5%] md:top-[5%]  py-5 px-5 w-auto h-auto"
      >
        Go back 🔙
      </button>
      <div className="flex z-10 justify-center max-w-lg w-auto md:absolute md:top-[20%] md:left-[38%] h-auto mx-auto bg-white  rounded-md overflow-hidden shadow-lg">
        <Avatar
          className="rounded-full h-28 w-28 mx-auto my-auto m-1 p-1  border-pink-600"
          name={name}
        />

        <div className="px-6 py-4">
          <div className="flex flex-col ">
            <div className="font-bold text-xl text-center text-gray-800 hover:text-pink-500 hover:cursor-pointer">
              {name}
            </div>
            <p className="text-gray-600 text-sm text-center">
              Software Developer
            </p>
          </div>
          <div className="mt-3">
            <span className="">
              Joined : <Moment format="LLLL">{createdAt}</Moment>
            </span>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Profile;
