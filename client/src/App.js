import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/signup/Signup";
import {Routes, Route} from "react-router";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/profile/UpdateProfile";

function App() {
    return (
        <div className="App">
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
