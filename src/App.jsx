
import { Route, Routes } from "react-router-dom";
import {
    Home,
    Footer,
    Navbar,
    Login,
    NotFound,
    Register
} from "./componentPath";

function App() {
    const base = '/';
    return (
        
                <div className="vw-100 vh-100 overflow-auto">
                    <Navbar />
                    <Routes>
                        <Route path={`${base}home`} element={<Home />} />
                        <Route path={`${base}login`} element={<Login />} />
                        <Route path={`${base}register`} element={<Register />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
        
    );
}

export default App;
