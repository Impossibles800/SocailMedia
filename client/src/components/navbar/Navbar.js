import React from "react";
import "./Navbar.scss";
import Avatar from "../avatar/Avatar";
import {useNavigate} from "react-router-dom";
import {AiOutlineLogout} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";


 export function Navbar() {

    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

    function handleLogOutClick() {
        // dispatch({type: 'appConfig/logout'});
        navigate('/login');
    }

     return (

        <div className="Navbar">

            <div className="container mt-5">
                <h2 className="banner hover:cursor-pointer text-2xl" onClick={() => navigate('/')}>Social Media</h2>
                <div className="right-side">
                    <div className="profile hover-link" onClick={() => navigate(`profile/`)}>
                        <Avatar src={myProfile?.avatar?.url}/>
                    </div>
                    <div className="logout hover-link" onClick={handleLogOutClick}>
                        <AiOutlineLogout/>
                    </div>
                </div>
            </div>
        </div>

    )
}
