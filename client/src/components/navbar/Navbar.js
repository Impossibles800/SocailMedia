import React from "react";
import "./Navbar.scss";

import Avatar from "../avatar/Avatar";
import {useNavigate} from "react-router-dom";
import {AiOutlineLogout} from "react-icons/ai";
import LoadingBar from "react-top-loading-bar";


export function Navbar() {

    const navigate = useNavigate();
    const loadingRef = React.useRef(null);

    const [loading, setLoading] = React.useState(false);

    function toggleLoadingBar() {
        if (loading) {
           setLoading(false);
           loadingRef.current.complete();
        } else {
            setLoading(true);
            loadingRef.current.continuousStart();
        }
    }

    return (

        <div className="Navbar">
            <LoadingBar height={6} color='#5f9fff' ref={loadingRef}/>
            <div className="container mt-5">
                <h2 className="banner hover:cursor-pointer text-2xl" onClick={() => navigate('/')}>Social Media</h2>
                <div className="right-side">
                    <div className="profile hover-link" onClick={() => navigate('/profile/')}>
                        <Avatar/>
                    </div>
                    <div className="logout hover-link" onClick={toggleLoadingBar}>
                        <AiOutlineLogout/>
                    </div>
                </div>
            </div>
        </div>

    )
}
