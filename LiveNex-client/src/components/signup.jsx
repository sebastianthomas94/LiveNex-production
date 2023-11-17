import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup] = useSignupMutation();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const googleAuth = async () => {
    try {
      const authWindow = window.open("http://localhost:8000/user/auth/google");
      
      const messageListener = (event) => {
        if (event.origin === "http://localhost:8000") {
          const response = event.data;
          localStorage.setItem("user", response.email)
          window.removeEventListener("message", messageListener);
          if (response) navigate("/dashboard");
        }
      };
      window.addEventListener("message", messageListener);
      toast.info("login successful");
    } catch (error) {
      if (error) throw error;
      toast.error(error.message);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside submit button");
    if (!email.trim()) {
      toast.error("Email is required");
      console.log("inside submit button");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    } else if (password.trim().length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    } else if (!isChecked) {
      toast.error("Please agree to Terms of service");
      return;
    }
    signup({ email, password, name })
      .unwrap()
      .then((result) => {
        console.log("requested");
        console.log(result);
        toast.success("Account created successfully");
        localStorage.setItem("user", email);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.status === 409) {
          toast.error("User already exists");
        } else console.error(err);
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4">Sign Up for LiveNex</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                placeholder="********"
                required
              />
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="text-gray-600">
                  I agree to the{" "}
                  <Link to="/login" className="text-indigo-500">
                    Terms of Service
                  </Link>
                  .
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-md py-2 font-semibold hover:bg-indigo-600 focus:ring focus:ring-indigo-300"
            >
              Sign Up
            </button>
          </form>
          {/* <!-- Google Login Option --> */}
          <div className="mt-4">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 "
              onClick={googleAuth}
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Sign In with Google</span>
              </button>
          </div>

          {/* <!-- Link to Login Page --> */}
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
