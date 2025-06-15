import arKeywords from "./ar"
import enKeywords from "./en"

const lang = {
    ar: {
        direction: 'rtl',
        lang: 'ar',
        ...arKeywords
    },
    en: {
        direction: 'ltr',
        lang: 'en',
        ...enKeywords
    }
}
export default lang