import React, { useState } from "react";
import { toast } from "react-toastify";
import logo2 from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        signUp({ email: formData.email, password: formData.password })
      );
      const user = unwrapResult(resultAction);
      toast.success(
        "Başarılı! E-mail'inize gelen doğrulama mailini doğrulayınız."
      );
      navigate("/login");
    } catch (error) {
      console.error("Signup error", error);
      displayErrorMessages(error);
    }
  };

  const displayErrorMessages = (error) => {
    const status = error.status || error.message;
    switch (status) {
      case "Invalid input":
        toast.error("Geçersiz istek, lütfen giriş bilgilerinizi kontrol edin.");
        break;
      case "Unauthorized":
        toast.error("Yetkisiz erişim, lütfen bilgilerinizi doğrulayın.");
        break;
      case "Forbidden":
        toast.error("Erişim reddedildi, yeterli yetkiniz yok.");
        break;
      case "Not Found":
        toast.error("Servis bulunamadı.");
        break;
      case "Conflict":
        toast.error("Bu e-posta adresi zaten kayıtlı.");
        break;
      case "Unprocessable Entity":
        toast.error("İşlenemeyen istek, form verileri geçersiz.");
        break;
      case "Internal Server Error":
        toast.error("İç sunucu hatası, lütfen daha sonra tekrar deneyin.");
        break;
      default:
        toast.error("Bir hata oluştu: " + status);
        break;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row py-4">
      <div className="lg:w-1/2 text-2xl pt-8 lg:mt-0 bg-pink-900 h-1/2 lg:h-full rounded-tl-3xl rounded-tr-3xl lg:rounded-tr-none lg:rounded-bl-3xl shadow-lg flex flex-col justify-center items-center">
        <h1 className="lg:text-7xl pb-2 text-center font-sans backdrop-blur-2xl backdrop-brightness-90 py-2 px-4 font-extrabold tracking-wide from-purple-400 via-pink-600 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
          Takvimini Değil,
        </h1>
        <h1 className="lg:text-7xl mt-4 text-center font-serif italic font-extrabold backdrop-blur-2xl py-2 px-4 backdrop-brightness-90 from-purple-400 via-pink-600 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
          Anlarını Planla!
        </h1>
        <img src={logo2} className="h-[13rem] flex items-end" alt="logo" />
      </div>
      <div className="lg:w-1/2 h-full flex flex-col justify-center items-center shadow-lg rounded-tr-3xl rounded-br-3xl shadow-pink-100">
        <form
          onSubmit={handleSignUp}
          className="flex flex-col justify-center lg:w-1/2 gap-y-4"
        >
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-pink-800 text-center">
              adolfha | Kayıt Ol
            </h1>
            <span className="text-sm text-neutral-400 text-center">
              Hızlıca Kayıt Ol
            </span>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className=" border border-stone-200 py-2 px-3 rounded-full"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border border-stone-200 py-2 px-3 rounded-full"
          />
          <button
            type="submit"
            className="mt-4 bg-pink-900 font-semibold text-white rounded-full py-2 px-3 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:transition-all hover:duration-300"
          >
            Kayıt Ol
          </button>
        </form>
        <span className="text-center text-sm text-neutral-400 mt-4">
          Hesabın var mı? {"    "}
          <a
            className="text-neutral-500 hover:text-neutral-600 font-medium"
            href="/login"
          >
            Giriş Yap
          </a>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
