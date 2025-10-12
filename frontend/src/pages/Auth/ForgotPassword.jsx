import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar"

export default function ForgotPassword() {

  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", newPassword: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/verifycode'); // user detail verification setup and code verification still needs to be set up. 
  };

  return (
    <>

    <Navbar />


        <div className="overflow-hidden relative w-screen min-h-screen bg-gradient-to-b top-0 from-[#FFF9F6] to-[#FFE2D5] justify-center items-center">
          <div className="relative z-10 w-full font-[Nobile] max-w-4xl transform scale-90 md:scale-100 my-20 my-60 mx-10 lg:mx-30 p-4 md:p-8">
          <h1 className="text-[#412200] font-bold text-4xl sm:text-5xl mb-15">Password Reset</h1>


          <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-col md:gap-6 w-full max-w-xs lg:max-w-full">
            
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="font-bold text-2xl sm:text-2xl text-[#412200]">First Name*</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                  className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 mb-10 text-lg sm:text-xl font-medium text-[#BD7777] bg-white"
                />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="font-bold text-2xl sm:text-2xl text-[#412200]">Last Name*</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                  className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 mb-10 text-lg sm:text-xl font-medium text-[#BD7777] bg-white"
                />
            </div>
            
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-2xl sm:text-2xl text-[#412200]">Email Address*</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 mb-10 text-lg sm:text-xl font-medium text-[#BD7777] bg-white"
                />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-2xl sm:text-2xl text-[#412200]">Password*</label>
                <input
                  type="password"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  required
                  className="w-full h-14 sm:h-14 border-2 border-[#BD7777] rounded-lg px-4 mb-10 text-lg sm:text-xl font-medium text-[#BD7777] bg-white"
                />
            </div>

              {error && <p className="text-[#412200] font-medium text-lg sm:text-xl w-4/5 md:w-full">{error}</p>}
              <button type="submit" className="w-full sm:w-50 h-20 sm:h-20 bg-[#BD7777] text-white border-[#BD7777] rounded-2xl font-medium text-2xl sm:text-3xl cursor-pointer">Submit</button>
          </form>
        </div>

      </div>
    </>
  )
}
