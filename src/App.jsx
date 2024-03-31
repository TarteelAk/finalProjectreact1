import React from "react"
import Root from './routes/Root.jsx';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Categories from "./pages/Home/component/Categories.jsx";
import SingUp from "./pages/SingUp/component/SingUp.jsx";
import SingIn from "./pages/SingIn/component/SingIn.jsx";
import Product from "./pages/Product/component/Product.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Details from "./pages/DetailsProduct/component/Details.jsx";
import AllProduc from "./pages/AllProduct/component/AllProduc.jsx";
import Cart from "./pages/Cart/component/Cart.jsx";
import ForgetPaswword from "./pages/ForgetPassword/component/ForgetPaswword.jsx";
import SendCode from "./pages/SnedCode/component/SendCode.jsx";
import UserContextProvider from "./context/User.jsx";
import Route from "./pages/ProutectRoute/component/Route.jsx";
import Order from "./pages/Order/component/Order.jsx";
import Review from "./pages/Review/component/Review.jsx";
import Profile from "./pages/Profile/componst/Profile.jsx";
import UserOrder from "./pages/Profile/componst/UserOrder.jsx";

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
    {
      path :"/details/:id",
      element :<Details/>
    },
    {
      path :"/product",
      element :<AllProduc />
    },
    {
      path :"/forget",
      element :<SendCode />
    },
    {
      path :"/reset",
      element :<ForgetPaswword />
    },
    {
      path :"/cart",

      element :
      <Route><Cart /></Route>
    },
    {
      path :"/order",
      element :<Order />
    },
    {
      path :"/products/:id/review",
      element :<Review />
    },
    {
      path :"/profile",
      element :<Profile />
    },
    {
      path :"/userOrders",
      element :<UserOrder />
    },


    
   
 ]
  },
]);
function App() {
  

  return (
    <UserContextProvider><RouterProvider router={router} />
   <ToastContainer /></UserContextProvider>
   
   
      
   
  )
}

export default App
