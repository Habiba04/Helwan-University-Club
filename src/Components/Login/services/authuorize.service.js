import { jwtDecode } from "jwt-decode"

const authorize = (token) => {
    
    const role = jwtDecode(token).role
    switch(role) {
        case 'admin': return 'admin';
        case 'member': return 'member';
    }
};

export default authorize