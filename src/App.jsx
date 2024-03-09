import React from "react"
import Root from './routes/Root.jsx';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Categories from "./pages/Home/component/Categories.jsx";
import SingUp from "./pages/SingUp/component/SingUp.jsx";
import SingIn from "./pages/SingIn/component/SingIn.jsx";
import Product from "./pages/Product/component/Product.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[{
      path :"/",
      element :<Categories />
    },
    {
      path :"/signUp",
      element :<SingUp />
    },
    {
      path :"/signIn",
      element :<SingIn />
    },
    {
      path :"/products/:id",
      element :<Product />
    },
    {
      path :"/categories",
      element :<Categories/>
    },
 ]
  },
]);
function App() {
  

  return (
    <>
   <RouterProvider router={router} />
   <ToastContainer />
   
      
    </>
  )
}

export default App
