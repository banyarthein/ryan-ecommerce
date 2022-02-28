import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { auth, googleAuthProvider } from "../../firebase"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";




const Login = ({ history }) => {

  const { user } = useSelector((siteState) => ({ ...siteState }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/")
      return;
    }
  }, [user]);

  const [email, setEmail] = useState("banyar.lanwork@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState("")

  let dispatch = useDispatch();

  useEffect(() => {
    //console.log(window.localStorage.getItem("emailForRegistration"))
    //setEmail(window.localStorage.getItem("emailForRegistration"))
  }, [])


  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    }
    else {
      history.push("/user/history");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log("Result is", result);

      const { user } = result;
      //console.log("User is", user);

      const idTokenResult = await user.getIdTokenResult();

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
          roleBasedRedirect(res);
        })
        .catch(err => {
          console.log(err);
          toast.error(err.message);
        });


      // dispatch({
      //   type: "LOGGED_IN_USER",
      //   payload: {
      //     email: user.email,
      //     token: idTokenResult.token,
      //   },
      // })

      // window.localStorage.setItem("userLoginEmail", email);
      // history.push("/");


    }
    catch (error) {
      console.log(error)
      toast.error(error.message);
      setLoading(false);
    }

  }


  const googleLogin = async () => {
    setLoading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

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
            roleBasedRedirect(res);
          })
          .catch(err => {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
          });



        // dispatch({
        //   type: "LOGGED_IN_USER",
        //   payload: {
        //     email: user.email,
        //     token: idTokenResult.token,
        //   },
        // })

        window.localStorage.setItem("userLoginEmail", email);

      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message);
        setLoading(false);
      });
  }


  const loginControl = () => (
    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus placeholder="Your email" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>

      <br />



      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>



    </form>
  )




  return (

    <div className="container p-5">

      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Login</h4>)}
          {loginControl()}
          <Button onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            size="large"
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">Forgot password</Link>

        </div>
      </div>
    </div>
  );
};



export default Login;
