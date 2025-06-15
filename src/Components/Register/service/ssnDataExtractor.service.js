
const ssnDataExtractor = (ssn) => {
    
    if (ssn.length < 14) { 
        return null;
    }

    const year = +('19' +  ssn.substr(0, 2));
    const month = + ssn.substr(2, 2);
    const day = + ssn.substr(4, 2);
    const birth = new Date(year, month - 1, day);
    const age = new Date().getFullYear() - birth.getFullYear();
    const yyyy = birth.getFullYear();
    const mm = String(birth.getMonth() + 1).padStart(2, '0');
    const dd = String(birth.getDate()).padStart(2, '0');
    const dob = `${yyyy}-${mm}-${dd}`;
    const genderDigit = + ssn.charAt(12);
    
    return {
        age,
        dob,
        gender: genderDigit % 2 ? 0 : 1
    }
};