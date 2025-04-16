import axios, { InternalAxiosRequestConfig } from "axios"
import toast from "react-hot-toast";

// const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const uri = 'https://server-222q-o7s5lbt4k-shyams-projects-a087ff4a.vercel.app/api'
// 'https://server-222q.vercel.app/api'
// 'https://server-88zz-cwzlqp0d4-shyams-projects-a087ff4a.vercel.app/api' 
// isLocalhost
//   ? 'http://localhost:3000/api'
//   : ;



const apiClient = axios.create({

    baseURL: 'https://server-222q-o7s5lbt4k-shyams-projects-a087ff4a.vercel.app/api',
    headers: {
        "Content-Type": "Application/JSON"
    },
})

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = token
        }
        return config
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    async (err) => {
        const originalConfig = err.config;
        if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            console.log(originalConfig)
        }
        return Promise.reject(err);
    }
)


export const LOGIN_USER = async (payload: any) => {
    try {
        const response = await axios.post(`${uri}/register`, payload)
        return response.data
    }
    catch (err: any) {
        console.log(err.message)
    }
}
export const GET_PRODUCTS = async () => {
    try {
        const response = await apiClient.get(`/products`)
        return response
    }
    catch (err: any) {
        console.log(err.message)
    }
}

export const GET_PRODUCTS_BY_ID = async (id: any) => {
    try {
        const response = await axios.get(`${uri}/products/${id}`)
        return response.data
    }
    catch (err: any) {
        console.log(err.message)
    }
}

export const GET_CART = async () => {
    try {
        const response = await apiClient.get(`/add-to-cart`)
        if (response) {
            toast.success("getting Cart Data")
        }
        return response
    }
    catch (err: any) {
        console.log(err.message)
    }
}

export const CREATE_CART = async (payload: any) => {
    try {
        const response = await apiClient.post(`/add-to-post`, payload)
        if (response) {
            toast.success("add")
        }
        return response
    }
    catch (err: any) {
        console.log(err.message)
    }
}


export const DELETE_CART = async (id: any) => {
    try {
        const response = await axios.delete(`${uri}/add-to-cart/${id}`)
        if (response) {
            toast.success("removed from cart")
        }
        return response.data
    }
    catch (err: any) {
        console.log(err.message)
    }
}