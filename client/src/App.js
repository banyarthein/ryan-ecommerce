import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./component/nav/Header";

import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";

import { auth } from "./firebase"
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import UserRoute from "./component/routes/UserRoute";


import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./component/routes/AdminRoute";
import CategoryCreate from "./pages/admin/category/CategoryCreate";



const App = () => {

  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        //console.log("USER:", user);

        currentUser(idTokenResult.token)
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
      }
    });

  }, [])

  return (
    <>
      <Header></Header>
      <ToastContainer />
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/register/complete" component={RegisterComplete}></Route>
        <Route exact path="/forgot/password" component={ForgotPassword}></Route>
        <UserRoute exact path="/user/history" component={History}></UserRoute>
        <UserRoute exact path="/user/password" component={Password}></UserRoute>
        <UserRoute exact path="/user/wishlist" component={Wishlist}></UserRoute>
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}></AdminRoute>
        <AdminRoute exact path="/admin/category" component={CategoryCreate}></AdminRoute>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </>

  );
};

export default App;
