import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/signup/Signup";
import {Routes, Route} from "react-router";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/profile/UpdateProfile";
import LoadingBar from "react-top-loading-bar";
import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";

function App() {
    const  isLoading = useSelector(state => state.appConfigReducer.isLoading);
    const loadingRef = useRef(null);

    useEffect(() => {
        if(isLoading){
            loadingRef.current?.continuousStart();
        }else{
            loadingRef.current?.complete();
        }
    }, [isLoading]);

    return (
        <div className="App">
            <LoadingBar height={6} color='#5f9fff' ref={loadingRef}/>

            <Routes>
                <Route element={<RequireUser/>}>
                    <Route path="/" element={<Home/>}>
                        <Route path="" element={<Feed/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/update-profile" element={<UpdateProfile/>}/>
                    </Route>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
