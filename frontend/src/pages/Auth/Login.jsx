import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar"

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
        <Navbar />

        <div className="overflow-hidden relative w-screen min-h-screen bg-gradient-to-b top-0 from-[#FFF9F6] to-[#FFE2D5] justify-center items-center">
        <img src="src/assets/girl-with-balloons.png" alt="Image of a girl with balloons" className="absolute md:w-[80vw] w-[100vw] -bottom-[-.05vw] -right-[20.5vw]"/>
          <div className="relative z-10 w-full font-[Nobile] max-w-4xl transform scale-90 md:scale-100 my-20 my-60 lg:mx-30 p-4 md:p-8">
          <h1 className="text-[#412200] font-bold text-4xl sm:text-5xl mb-10">Log In</h1>
          <p className="w-4/5 md:w-full text-[#412200] font-medium font-[Nobile] text-lg sm:text-2xl mb-13">
            Log in to access your ElleHacks26 application.
          </p>


          <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-col md:gap-6 w-full max-w-xs md:max-w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-2xl sm:text-2xl text-[#412200]">Email Address*</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 text-lg sm:text-xl font-medium text-[#BD7777] bg-white"
                />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-2xl mt-10 sm:text-2xl text-[#412200]">Password*</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 text-lg sm:text-xl font-medium text-[#BD7777] bg-white"
                />
            </div>

            <p className="py-8"><Link to="/forgotpassword" className="text-[#412200] font-medium text-lg sm:text-2xl underline">Forgot your password?</Link></p>
          

              {error && <p className="text-[#412200] font-medium text-lg sm:text-xl w-4/5 md:w-full">{error}</p>}
              <button type="submit" className="w-full sm:w-50 h-20 sm:h-20 bg-[#BD7777] text-white border-[#BD7777] rounded-2xl font-medium text-2xl sm:text-3xl cursor-pointer">Log In</button>
              <p className="text-[#412200] font-medium text-lg sm:text-xl mt-11 w-4/5 md:w-full">
                Don't have an account? <Link to="/signup" className="text-[#DD006B] underline">Create one</Link>
              </p>
          </form>
        </div>

      </div>
    </>
  )
}
