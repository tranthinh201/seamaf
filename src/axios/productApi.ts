import axiosClient from "./axiosClient";

const productApi = {
    getAll: async () => {
        const url = 'product';
        return await axiosClient.get(url);
    },
    getLatesProduct: async () => {
        const url = 'product/getlates';
        return await axiosClient.get(url);
    },
    getDetail: async (id:any) => {
        const url = `product/getDetail/${id}`;
        return await axiosClient.get(url);
    },
    login: async (user:any) => {
        const url = 'user/login';
        return await axiosClient.post(url, user);
    }
}

export default productApi