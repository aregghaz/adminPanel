import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const options = {
    // order and from where user language should be detected
    order: ["querystring", "cookie", "localStorage", "htmlTag", "navigator", "path", "subdomain"],

    // keys or params to lookup language from
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ["localStorage", "cookie"],
    excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: "myDomain",

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,

    // only detect languages that are in the whitelist
    checkWhitelist: true
};
const resources = {
    ru:{
        admin: {
            id:'Ид',
            name:'Название',
            description:'Описание',
            price:'Цена',
            special_price:'Специальная цена',
            teg:'Тег',
            brand:'Бренд',
            brands:'Бренд',
            types:'Виды',
            slug:'Url',
            email:'Эл. адрес',
            image:'изображение',
            meta_title:'мета заголовок',
            meta_key:'ключевые слова',
            meta_desc:'мета описание',
            status:'статус',
            password:'пароль',
            sign_in:'войти',
            conditions:'Состояние',
            category:'Категория',
            categories:'Категория',
            action:'Действие',
            title:'Название',
            parent:"Родитель",
            updated:"обновлено",
            attributes:"атрибуты",
            lastName:"фамилия",
            fatherName:"отчество",
            phone:"телефон",
            subscribed:"подписан",
            date_special_price:"дата действия специальной цены",
            quantity:"количество",
            create:"создать",
            update:"обновить",
            mark_all:'пометить все',
            remove_all:'убрать все',
            position:'позиция',
            record_successfully_edited:'запись успешно изменена',
            record_successfully_added:'запись успешно добавлена',
        }
    },

};
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
        resources,
        lng: "ru",
        detection: options,
        defaultNS: "site",
        fallbackLng: ["hy", "en", "ru"],
        namespaces: ["site", "admin"],
        keySeparator: false,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })
    .catch(error => {
        throw new Error(error);
    });

export default i18n;
