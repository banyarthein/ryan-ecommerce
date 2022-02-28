import React, { useEffect, useState } from "react";
import { auth } from "../../firebase"
import { toast } from "react-toastify"
//import "react-toastify/dist/ReactTostify.css"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((siteState) => ({ ...siteState }));
  let dispatch = useDispatch();

  useEffect(() => {
    //console.log(window.localStorage.getItem("emailForRegistration"))
    setEmail(window.localStorage.getItem("emailForRegistration"))
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both email and password required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }


    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //console.log("RESULT", result); 

      if (result.user.emailVerified) {

        //remove the user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        toast.success(idTokenResult.token);

        //redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            //console.log("CREATE OR UPDATE RES", res);
            const foundUser = res.data;
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: foundUser.name,
                email: foundUser.email,
                token: idTokenResult.token,
                role: foundUser.role,
                _id: foundUser._id,
              },
            })
          })
          .catch(err => {
            console.log(err);
            toast.error(err.message);
          });


        //redirect
        history.push("/");
      }

    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit} >
      <input type="email" className="form-control" value={email} disabled />
      <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoFocus />
      <br />
      <button className="btn btn-raised">
        Complete Registeration
      </button>
    </form>)


  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
