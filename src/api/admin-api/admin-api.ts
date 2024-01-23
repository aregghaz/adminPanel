import axios from "axios";

const fakeUrl = 'http://127.0.0.1:8000'
export const AdminApi = {

    dashboard() {
        return axios.get(`${fakeUrl}/api/admin/dashboard`).then(res => res.data);
    },
    delete(crudKey: string, id: number) {
        return axios.delete(`${fakeUrl}/api/${crudKey}/${id}`).then(res => res.data);
    },

    store(formData: FormData, crudKey: string, isAdmin: boolean) {
        return axios.post(`${fakeUrl}/api/${crudKey}`, formData).then(res => res.data);
    },
    getProduct() {
        return axios.get(`${fakeUrl}/api/products`).then(res => res.data);
    },
    update(formData: FormData, crudKey: string, id: number) {

        return axios.post(`${fakeUrl}/api/${crudKey}/${id}`, formData).then(res => res.data);
    },
    //////////
    create(crudKey: string) {
        return axios.get(`${fakeUrl}/api/${crudKey}/create`).then(res => res.data);
    },
    getItemData(crudKey: string, id: number) {
        return axios.get(`${fakeUrl}/api/${crudKey}/${id}`).then(res => res.data);
    },
    get(crudKey: string) {
        return axios.get(`${fakeUrl}/api/${crudKey}`).then(res => res.data);
    },


};