import { useContext } from "react";
import lang from "../../assets/lang/language";
import { LanguageContext } from "../../context/LanguageProvider.context";

const useMembership = () => {
    const { language } = useContext(LanguageContext);

    return [
        lang[language].membershipTypes,
        1,
        false,
        [0,1,2,3,4,5,6,8], // working membership jobs 
        [7], // sport membership jobs 
        [7, 8], // foreigner sessonal membership jobs
        [1] // allowed member ship types to foreign 
    ];
};

export default useMembership;