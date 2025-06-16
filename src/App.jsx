
import { Route, Routes } from "react-router-dom";
import {
    Home,
    Footer,
    Navbar,
    Login,
    NotFound,
    Register,
    Profile,
    MembersList,
    StaffList,
    LogsList,
    BillingList,
    ProfileList
} from "./componentPath";

function App() {
    const base = '/';
    return (
        
                <div className="vw-100 vh-100 overflow-auto">
                    <Navbar />
                    <Routes>
                        <Route path={`${base}home`} element={<Home />} />
                        <Route path={`${base}`} element={<Home />} />
                        <Route path={`${base}login`} element={<Login />} />
                        <Route path={`${base}register`} element={<Register />} />
                        <Route path={`${base}profile/:id`} element={<Profile />} />
                        <Route path={`${base}members`} element={<MembersList />} />
                        <Route path={`${base}staff`} element={<StaffList />} />
                        <Route path={`${base}logs`} element={<LogsList />} />
                        <Route path={`${base}member/billing`} element={<BillingList />} />
                        <Route path={`${base}member/cards`} element={<ProfileList />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
        
    );
}

export default App;
