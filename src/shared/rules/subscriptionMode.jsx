import { useContext } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";

const useSubscriptionMode = () => {
    const { language } = useContext(LanguageContext);

    return [
        lang[language].subscriptionModes,
        0,
        false,
    ];
};

export default useSubscriptionMode;