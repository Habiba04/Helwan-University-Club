import { useContext } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";

const useGender = () => {
    const { language } = useContext(LanguageContext);
    
    return [
        lang[language].gender,
        0,
        false
    ];
};

export default useGender;