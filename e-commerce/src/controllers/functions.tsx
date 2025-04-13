import axios from "axios"
import toast from "react-hot-toast";

// const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const uri = 'https://server-222q.vercel.app/api/'
// 'https://server-88zz-cwzlqp0d4-shyams-projects-a087ff4a.vercel.app/api' 
// isLocalhost
//   ? 'http://localhost:3000/api'
//   : ;

export const GET_PRODUCTS = async () => {
    const response =  await axios.get(`${uri}/products`)
    return response.data
}

export const GET_PRODUCTS_BY_ID = async (id : any) => {
    try{
        const response =  await axios.get(`${uri}/products/${id}`)
        return response.data
    }
    catch(err : any){
        console.log(err.message)
    }
}

export const GET_CART = async () => {
    try{
        const response = await axios.get(`${uri}/add-to-cart`)
        if (response) {
            toast.success("getting Cart Data")
        }
        return response.data
    }
    catch(err : any){
        console.log(err.message)
    }
}

export const CREATE_CART = async (payload : any) => {
    try{
        const response = await axios.post(`${uri}/add-to-cart`, payload)
        if (response) {
            toast.success("add")
        }
        return response.data
    }
    catch(err : any){
        console.log(err.message)
    }
}


export const DELETE_CART = async (id : any) => {
    try{
        const response = await axios.delete(`${uri}/add-to-cart/${id}`)
        if (response) {
            toast.success("removed from cart")
        }
        return response.data
    }
    catch(err : any){
        console.log(err.message)
    }
}