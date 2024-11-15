import { useDispatch } from "react-redux";
import "./App.css";
import authservice from "./appwrite/Auth";
import { login, logout } from "./store/authSlice";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return  !Loading ? (  <div className="min-h-screen flex flex-wrap content-between bg-gray-400
  ">
    <div className="w-full block">
      <Header/>
      <main>
        TODO : {/* <Outlet/> */}
      </main>
      <Footer/>
    </div>
  </div> 
  )
  : null
}

export default App;
