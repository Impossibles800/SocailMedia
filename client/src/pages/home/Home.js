import React from "react";
import {axiosClient} from '../../utils/axiosClient' ;
import {useEffect} from 'react';
function Home() {

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const result = await axiosClient.get('/post/all');
            console.log('Result from backend, Home: ', result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Home">
            <h1 className="text-center">Home</h1>
        </div>
    )
}

export default Home;