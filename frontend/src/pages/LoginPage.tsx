// frontend/src/pages/LoginPage.tsx
import { useState } from "react";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import BannerSvg from "../assets/banner-illustration.svg";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex  justify-center  md:items-center bg-gradient-to-br from-white via-purple-50 to-indigo-100">
      <div className=" w-[100%] max-w-5xl h-[550px] bg-white rounded-xl overflow-hidden flex  md:colored-shadow md:shadow-lg">
        
        {/* LEFT BANNER */}
       <div className="w-1/2 hidden md:flex flex-col justify-center px-12 text-white
                bg-gradient-to-br from-indigo-600 to-pink-500 relative overflow-hidden">

                <img
                  src={BannerSvg}
                  alt="Banner Illustration"
                  className="absolute bottom-0 right-0 w-72 opacity-20"
                />

                <h1 className="text-3xl font-bold mb-4 relative z-10">
                  Welcome to Eatap
                </h1>

                <p className="text-sm opacity-90 relative z-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore.
                </p>
        </div>


        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-[80%]">
            {isLogin ? <Login /> : <Register />}

            <p className="text-sm text-center mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 ml-1 font-medium hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

