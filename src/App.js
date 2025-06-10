import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import Home from './Components/HomePage/Home.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';


function App() {
  return (
    <>
    <Navbar isLoggedIn={true} role="member"/>
    <Home/>
    <Footer/>
    </>
  );
}

export default App;
