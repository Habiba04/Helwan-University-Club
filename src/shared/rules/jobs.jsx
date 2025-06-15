import { useContext } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";

const useJobTypes = () => {
    const { language } = useContext(LanguageContext);

    return [
        lang[language].jobTypes,
        1,
        false,
        [1, 3, 5, 7, 8] // has no salary
    ];
};

export default useJobTypes;