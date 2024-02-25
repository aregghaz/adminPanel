import axios from "axios";
import {fakeUrl} from "../../utils/getFieldLabel";

export const AdminApi = {
    dashboard() {
        return axios.get(`${fakeUrl}/api/admin/dashboard`).then(res => res.data);
    },
    delete(crudKey: string, id: number) {
        return axios.delete(`${fakeUrl}/api/${crudKey}/${id}`).then(res => res.data);
    },
    store(formData: FormData, crudKey: string) {
        return axios.post(`${fakeUrl}/api/${crudKey}`, formData).then(res => res.data);
    },
    getProduct() {
        return axios.get(`${fakeUrl}/api/products`).then(res => res.data);
    },
    update(formData: FormData, crudKey: string, id: number) {

        return axios.post(`${fakeUrl}/api/${crudKey}/${id}`, formData).then(res => res.data);
    },
    create(crudKey: string) {
        return axios.get(`${fakeUrl}/api/${crudKey}/create`).then(res => res.data);
    },
    getItemData(crudKey: string, id: number) {
        return axios.get(`${fakeUrl}/api/${crudKey}/${id}`).then(res => res.data);
    },
    get(crudKey: string, showMore?: number, query?: string) {
        return axios.get(`${fakeUrl}/api/${crudKey}?showMore=${showMore}&query=${query}`).then(res => res.data);
    },
    saveImages(images: { id: number, images: Array<any> }) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post(`${fakeUrl}/api/upload-images`, images, config).then(res => res.data);
    },
    deleteImage(id:number){
        return axios.get(`${fakeUrl}/api/delete-image/${id}`).then(res => res.data);
    } ,
    getImages(id:number){
        return axios.get(`${fakeUrl}/api/get-images/${id}`).then(res => res.data);
    }
};
