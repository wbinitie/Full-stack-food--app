import React, { useState } from "react";
import { create } from "../userComponents/api-user";
import auth from "../../auth/auth-helper";
import { useHistory } from "react-router-dom";

function SignUp() {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        alert(data.error);
      } else {
        auth.authenticate(data, () => {
          history.push("/");
        });
      }
    });
  };
  return (
    <div>
      {/* page */}
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white font-Merriweather">
        {/* <!-- component --> */}
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Sign Up</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Full Name.... "
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email.... "
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              name="password"
              id="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button
            onClick={clickSubmit}
            className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          >
            SIGN UP
          </button>

          <p className="text-center text-lg">
            Have an account already?
            <a
              href="/signIn"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            >
              {" "}
              Sign In
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
