
import lang from "../../../assets/lang/language";

const validate = (email, password, langType) => {
    const errs = {};
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errs.email = lang[langType].invalidEmail;
    }
    if (!password || password.length <= 6) {
        errs.password = lang[langType].invalidPassword;
    }
    return errs;
};

export default validate;