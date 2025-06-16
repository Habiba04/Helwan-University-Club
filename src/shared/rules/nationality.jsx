import { useContext } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";

const useNationality = () => {
    const { language } = useContext(LanguageContext);

    return [
        lang[language].nationality,
        0,
        false,
        [6] // has fill DOB manaully
    ];
};

export default useNationality;