import React from "react";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { signOut } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await dispatch(signOut());
      toast.success("Başarıyla çıkış yapıldı.");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      displayErrorMessages(error);
    }
  };

  const displayErrorMessages = (error) => {
    switch (error.status) {
      case 401:
        toast.error("Yetkisiz işlem, lütfen tekrar deneyin.");
        break;
      case 500:
        toast.error("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
        break;
      default:
        toast.error("Bir hata oluştu: " + error);
        break;
    }
  };

  return (
    <div className="bg-pink-900 w-full h-20 mb-16 flex items-center justify-between border-b-4 border-purple-300 shadow-lg">
      <img src={logo} className="!h-[3.5rem] ml-16" alt="logo" />
      <button
        onClick={handleSignOut}
        className="bg-purple-100 px-4 py-1 rounded-full text-purple-700 flex text-sm items-center gap-x-2 mr-24"
      >
        <LogOut />
        Çıkış Yap
      </button>
    </div>
  );
};

export default Header;
