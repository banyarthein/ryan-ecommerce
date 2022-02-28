import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../component/nav/AdminNav";
import { createCategory, getCategories, removeCategory } from "../../../functions/category";

const CategoryCreate = () => {

    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        createCategory({ name }, user.token)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
            })
            .catch((err) => {
                console.log("Error is ", err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }

    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label> Name</label>
                <input type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required />
                <button className="btn btn-outline-primary">Save</button>
            </div>
        </form>
    );

    return (
        <div className="contianer contianer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col">
                    <h4>Create category</h4>
                    {categoryForm()}
                </div>
            </div>
        </div>
    )

}

export default CategoryCreate;