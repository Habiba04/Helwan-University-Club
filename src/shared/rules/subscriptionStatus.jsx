import { useContext } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";

const useSubscriptionStatus = () => {
    const { language } = useContext(LanguageContext);

    return [
        lang[language].subscriptionStatus,
        0,
        false,
    ];
};

export default useSubscriptionStatus;