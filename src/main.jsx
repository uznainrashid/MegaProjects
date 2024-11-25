import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx"
import Post from "./Pages/Post.jsx"
import AddPost from "./Pages/Addpost.jsx";
import Signup from './Pages/Signup.jsx'
import EditPost from "./Pages/EditPost.jsx";



import AllPosts from "./Pages/Allpost.jsx";
import { AuthLayout, Login } from "./components/Index.js";


const router = createBrowserRouter( [
{
  path: "/",
  element: <App/>,
  children:[
    {
      path:"/",
      element: <Home/>
    },
    {
      path:"/login",
      element : (
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      )
    },
    {
      path: "/signup",
      element: (
          <AuthLayout authentication={false}>
              <Signup />
          </AuthLayout>
      ),
  },
  {
    path: "/all-posts",
    element: (
        <AuthLayout authentication>
            {" "}
            <AllPosts />
        </AuthLayout>
    ),
},
{
  path: "/add-post",
  element: (
      <AuthLayout authentication>
          {" "}
          <AddPost />
      </AuthLayout>
  ),
},
{
  path: "/edit-post/:slug",
  element: (
      <AuthLayout authentication>
          {" "}
          <EditPost />
      </AuthLayout>
  ),
},
{
  path: "/post/:slug",
  element: <Post />,
},
  ]
}]
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
