import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-3xl text-center mb-4">Register</h1>
          <form
            method="post"
            className="max-w-md mx-auto"
            onSubmit={registerUser}
          >
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              className="primary py-4 my-4 cursor-pointer"
              value="Register"
            />
            <div className="text-center text-gray-500">
              Already a member?
              <Link className="text-black underline" to={"/login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
