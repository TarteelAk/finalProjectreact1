import React from "react"
import Root from './routes/Root.jsx';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Categories from "./pages/Home/component/Categories.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[{
      path :"/",
      element :<Categories />

    },
 ]
  },
]);
function App() {
  

  return (
    <>
   <RouterProvider router={router} />
   
      
    </>
  )
}

export default App
