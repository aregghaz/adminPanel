const getFieldLabel = (t: any, label: string, name: string, requiredFields: Array<string>) => {

    ////TODO ADD LOGIN TO ADMIN PANEL
    return label
        ? `${t(`admin:${label}`)}${requiredFields?.includes(name) ? "*" : ""}`
        : `${t(`admin:${name}`)}${requiredFields?.includes(name) ? "*" : ""}`;
};


export default getFieldLabel;

//export const fakeUrl = 'http://127.0.0.1:8000'
export const fakeUrl = 'http://back.adminpanelbrand.tw1.ru'
