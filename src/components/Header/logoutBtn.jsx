import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authservice from "../../appwrite/Auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handlerBtn = () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-block px-6 py-2 hover:bg-blue-100 rounded-full"
      onClick={handlerBtn}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
