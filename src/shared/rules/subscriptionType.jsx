import { useContext } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";

const useSubscriptionTypes = () => {
    const { language } = useContext(LanguageContext);

    return [
        lang[language].subscriptionTypes,
        0,
        false,
        [0,1,2,3,4,7], // yearSubscription
        [6], // monthSubscription
        [5,6], // halfYearSubscription
    ];
};

export default useSubscriptionTypes;