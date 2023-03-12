import React from "react";
import {useEffect} from 'react';
import {Navbar} from "../../components/navbar/Navbar";
import {Outlet} from "react-router";
import {useDispatch} from "react-redux";
import {getMyInfo} from "../../redux/slices/appConfigSlice";



function Home() {
    
 const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyInfo());
    },[]);
    
    
    return <>
        <Navbar/>
        <div className="mt-40">
            <Outlet/>
        </div>

    </>;

}

export default Home;