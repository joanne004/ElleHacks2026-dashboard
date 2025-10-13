import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await signup(form.firstName, form.lastName, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setError("Error creating account");
    }
  };

  return (
    <>
      <Navbar />
      <div className="overflow-hidden relative w-screen min-h-screen bg-gradient-to-b from-[#FFF9F6] to-[#FFE2D5] flex justify-center items-center">

        <div className="relative z-10 w-full font-[Nobile] max-w-4xl transform scale-90 md:scale-100 my-40 mx-auto p-4 md:p-8">
          <h1 className="text-[#412200] font-bold text-4xl sm:text-5xl mb-6">
            Join ElleHacks26
          </h1>
          <p className="w-4/5 md:w-full text-[#412200] font-medium text-lg sm:text-2xl mb-10">
            Create your account to start your application.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="firstName"
                  className="font-bold text-2xl sm:text-2xl text-[#412200]"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="ex. Mary"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  required
                  autoComplete="given-name"
                  className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 text-lg sm:text-xl font-medium text-[#412200] bg-white placeholder:text-[#BD7777] placeholder:font-medium placeholder:text-2xl"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="lastName"
                  className="font-bold text-2xl sm:text-2xl text-[#412200]"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="ex. Smith"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  required
                  autoComplete="family-name"
                  className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 text-lg sm:text-xl font-medium text-[#412200] bg-white placeholder:text-[#BD7777] placeholder:font-medium placeholder:text-2xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label
                htmlFor="email"
                className="font-bold text-2xl sm:text-2xl text-[#412200]"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="ex. mary.smith@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
                className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 text-lg sm:text-xl font-medium text-[#412200] bg-white placeholder:text-[#BD7777] placeholder:font-medium placeholder:text-2xl"
              />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label
                htmlFor="password"
                className="font-bold text-2xl sm:text-2xl text-[#412200]"
              >
                Password*
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create your password..."
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="new-password"
                className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 text-lg sm:text-xl font-medium text-[#412200] bg-white placeholder:text-[#BD7777] placeholder:font-medium placeholder:text-2xl"
              />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label
                htmlFor="confirmPassword"
                className="font-bold text-2xl sm:text-2xl text-[#412200]"
              >
                Confirm Password*
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password..."
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
                autoComplete="new-password"
                className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 text-lg sm:text-xl font-medium text-[#412200] bg-white placeholder:text-[#BD7777] placeholder:font-medium placeholder:text-2xl"
              />
            </div>

            {error && (
              <p className="text-red-500 font-medium text-lg sm:text-xl mt-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full sm:w-80 h-20 mt-8 bg-[#BD7777] text-white border-[#BD7777] rounded-2xl font-medium text-2xl sm:text-3xl cursor-pointer"
            >
              Create Account
            </button>

            <p className="text-[#412200] font-medium text-lg sm:text-xl mt-8">
              Already have an account?{" "}
              <Link to="/login" className="text-[#DD006B] underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
