import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import UserOrder from "./UserOrder";
import Order from "../../Order/component/Order";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("userToken");
  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/user/profile`,
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      console.log(data.user);
      setProfile(data.user);
      if (data.message == "success") {
        toast.success(" This Is profile !", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <h2>My Profile</h2>
      <div>
        <h3>Name : {profile.userName}</h3>
        <h3>Email : {profile.email}</h3>
        <h2>My Orders</h2>
        <UserOrder />
      </div>
    </div>
  );
}
