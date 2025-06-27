/* eslint-disable react-hooks/rules-of-hooks */
import { jwtDecode } from "jwt-decode"

const authorize = (token,setData) => {
    const userData = { token, user: jwtDecode(token) };
    setData(userData); 
    return userData
};


export default authorize