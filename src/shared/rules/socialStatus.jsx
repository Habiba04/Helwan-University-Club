import { useContext } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";

const useSocialStatus = () => {
    const { language } = useContext(LanguageContext);

    return [
        lang[language].socialStatus,
        0,
        false
    ];
};

export default useSocialStatus;