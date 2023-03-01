import React from "react";
import "./Navbar.scss";

import Avatar from "../avatar/Avatar";
import {useNavigate} from "react-router-dom";

export function Navbar() {

    const navigate = useNavigate();

    return (<div className="Navbar">
            <div className="container mt-5">
                <h2 className="banner hover:cursor-pointer text-2xl" onClick={()=> navigate('/')}>Social Media</h2>
                <div className="right-side">
                    <div className="profile hover-link" onClick={()=>navigate('/profile/')}>
                        <Avatar/>
                    </div>
                </div>
            </div>
        </div>)
}
