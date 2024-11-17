import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/Auth";
import { logout } from "../../store/authSlice";

function logoutBtn() {
  const dispatch = useDispatch();
  const handlerBtn = () => {
    authservice.Logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 py-2 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
}

export default logoutBtn;
