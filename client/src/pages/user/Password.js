import React, { useState } from "react";
import { toast } from "react-toastify";
import UserNav from "../../component/nav/UserNav";
import { auth } from "../../firebase";


const Password = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        //console.log(`Password, specified is ${password}`);

        await auth.currentUser.updatePassword(password)
            .then(() => {
                //
                setLoading(false);
                toast.success(`Password updated`);
            })
            .catch(err => {
                //
                setLoading(false);
                toast.error(err.message)
                console.log("Error in Password updating", err);
            })

    }

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Your Password
                    </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter new password"
                        disabled={loading}
                        value={password}
                    />

                    <button className="btn btn-primary" disabled={!password || password.length < 6 || loading} >
                        Submit
                    </button>

                </div>

            </form >

        );
    }

    return (
        <div className="contianer contianer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav></UserNav>
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading</h4>) : (<h4>Password update</h4>)}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password;