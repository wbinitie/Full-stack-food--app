import React, { useState } from "react";
import { create } from "../userComponents/api-user";
import auth from "../../auth/auth-helper";
import { useHistory } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
function SignUp() {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        auth.authenticate(data, () => {
          history.push("/");
        });
      }
    });
  };
  const SignupButton = (
    <button
      onClick={clickSubmit}
      className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
    >
      SIGN UP
    </button>
  );
  const LoadingButton = (
    <button
      disabled
      type="button"
      className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
    >
      <svg
        role="status"
        class="inline w-4 h-4 mr-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
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
          <PasswordChecklist
            rules={["minLength", "notEmpty"]}
            value={values.password}
            minLength={7}
            messages={{
              minLength: "Your password must contain 7 or more characters.",
              notEmpty: "Your password cannot be empty",
            }}
          />
          {isLoading ? LoadingButton : SignupButton}
          {/* <button
            onClick={clickSubmit}
            className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          >
            SIGN UP
          </button> */}

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
