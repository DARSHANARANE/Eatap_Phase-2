// frontend/src/pages/LoginPage.tsx
import { useState } from "react";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import BannerCarousel from "../components/BannerCarousel";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex  justify-center  md:items-center bg-gradient-to-br from-white via-purple-50 to-indigo-100">
      <div className=" w-[100%] max-w-5xl h-[550px] bg-white rounded-xl overflow-hidden flex  md:colored-shadow md:shadow-lg">
        
        {/* LEFT BANNER */}
        <BannerCarousel />

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

