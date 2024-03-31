import React, { useState } from "react";
import style from "../component/review.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

export default function Review() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    comment: "",
   
  });
  const token = localStorage.getItem("userToken");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/products/${id}/review`,
        { user },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setUser({
        comment: "",
       
      });
      if (data.message == "success") {
        toast.success(" Add to Comment Succsee !", {
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
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.wrapper}>
        <div className={style.login}>
          <h2>Create Review</h2>
          <form className={style.formLogin} onSubmit={handleSubmit}>
            <div className={style.inputbox}>
              <input
                type="text"
                value={user.comment}
                name="comment"
                onChange={handleChange}
              />
              <label>Comment</label>
            </div>

            <button
              type="submit"
              disabled={loader ? "disabled" : null}
              className={style.btn}
            >
              {!loader ? "Confirm" : "wait..."}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
