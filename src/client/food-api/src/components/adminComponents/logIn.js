import React, { useState } from "react";
import { signIn } from "../../auth/auth-api";
import auth from "../../auth/auth-helper";
import { Redirect } from "react-router";

function LogIn(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
    redirectToReferrer: false,
    error: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    const user = {
      username: values.email || undefined,
      password: values.password || undefined,
    };

    signIn(user, "admin").then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  // const { from } = props.location.state || {
  //   //The Navigate component, if rendered,
  //   //will take the app to the last location that was received in the props or to the Home component at the root.
  //   from: {
  //     pathname: "/admin/home",
  //   },
  // };

  if (values.redirectToReferrer) {
    return <Redirect to={"/admin/home"} />;
  }

  return (
    <div>
      {/* page */}
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        {/* <!-- component --> */}
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Log In</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Email or Username"
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
            LOG IN
          </button>

          <a
            href="/"
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            FORGOT PASSWORD?
          </a>

          <p className="text-center text-lg">
            No account?
            <a
              href="/"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            >
              Create One
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default LogIn;
