import axios from "axios";
import {fakeUrl} from "../../utils/getFieldLabel";

export const AdminApi = {
    dashboard() {
        return axios.get(`${fakeUrl}/api/getLatestOrders`).then(res => res.data);
    },
    yearProfit() {
        return axios.get(`${fakeUrl}/api/year-profit`).then(res => res.data);
    },
    orderCount() {
        return axios.get(`${fakeUrl}/api/order-count`).then(res => res.data);
    },
    delete(crudKey: string, id: number) {
        return axios.delete(`${fakeUrl}/api/${crudKey}/${id}`).then(res => res.data);
    },
    groupDelete(crudKey: string, ids: Array<number>) {
        return axios.post(`${fakeUrl}/api/${crudKey}/groupDelete`,{"ids":ids}).then(res => res.data);
    },
    groupAddTag(crudKey: string, ids: Array<number>) {
        return axios.post(`${fakeUrl}/api/${crudKey}/groupAddTeg`,{"ids":ids}).then(res => res.data);
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
    } ,
    getTag(){
        return axios.get(`${fakeUrl}/api/getTagsSelect`).then(res => res.data);
    },
    getStatus(){
        return axios.get(`${fakeUrl}/api/getStatusSelect`).then(res => res.data);
    },
    addGroupTed(ids:Array<number>, tegId:number){
        return axios.post(`${fakeUrl}/api/getTagsSelect`, {ids:ids, tegId:tegId }).then(res => res.data);
    },
    addGroupStatus(ids:Array<number>, statusId:number){
        return axios.post(`${fakeUrl}/api/change-status`, {ids:ids, statusId:statusId }).then(res => res.data);
    },
    addGroupDiscount(ids:Array<number>, value:{
        dates: '',
        discount: "0",
    }){
        return axios.post(`${fakeUrl}/api/products/add-discount`, {ids:ids, value:value }).then(res => res.data);
    },
    getSingleOrder(id:number){
        return axios.get(`${fakeUrl}/api/auth/single-orders/${id}`).then(res => res.data);

    }

};
