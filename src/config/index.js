import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const API_BASE_URL = 'http://13.126.149.224:8000/api'
export const IMG_BASE_URL = '../../assets'

// export const API_BASE_URL = 'http://localhost:8000/api'


export const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const config = (reqtoken) => {
    console.log(reqtoken)
    if(!reqtoken) {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'withCredentials': true
        }
    }
    return headers
    }
    else {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${reqtoken}`
    }
    return headers
    }
} 