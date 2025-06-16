import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageProvider.context";
import lang from "../../assets/lang/language";
const NotFound = () => {
    const { language } = useContext(LanguageContext);
    return (
        <div className="text-center m-5 p-5 h-25" dir={lang[language].direction}>
            <h1 className="alert alert-info text-black">
                <span className="text-danger mx-2">404</span>
                {lang[language].notFound}
                <FontAwesomeIcon className="mx-3" icon={faExclamation} />
            </h1>
        </div>
    );
}


export default NotFound;