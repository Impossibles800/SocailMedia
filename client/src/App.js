import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/signup/Signup";
import {Routes, Route} from "react-router";
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<RequireUser/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
