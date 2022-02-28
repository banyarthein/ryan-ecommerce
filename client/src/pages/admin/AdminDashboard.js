import React from "react";
import AdminNav from "../../component/nav/AdminNav";

const AdminDashboard = () => {
    return (
        <div className="contianer contianer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col">
                    Admin Dashboard Pane
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard