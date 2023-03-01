import React from "react";
import {axiosClient} from '../../utils/axiosClient' ;
import {useEffect} from 'react';
import {Navbar} from "../../components/navbar/Navbar";
import {Outlet} from "react-router";

function Home() {

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axiosClient.get('/user/posts');
            console.log('Result from backend, Home: ', result);
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <Navbar/>
        <Outlet/>
    </>;

}

export default Home;