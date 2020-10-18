import axios from 'axios'
import { TResponse, TPositionsResponse } from '../types/types'

const baseURL = 'https://frontend-test-assignment-api.abz.agency/api/v1/'

const getToken = async (): Promise<TResponse | string> => {
  try {
    return (await axios.get(`${baseURL}token`)).data
  } catch (e) {
    return e.message
  }
}

const getData = async (url: string): Promise<TResponse | string> => {
  try {
    return (await axios.get(url)).data
  } catch (e) {
    return e.message
  }
}

const getUsers = async (
  page: number,
  count: number,
): Promise<TResponse | string> => {
  try {
    return (await axios.get(`${baseURL}users?page=${page}&count=${count}`)).data
  } catch (e) {
    console.log(e)
    return e.message
  }
}

const getPositions = async (): Promise<TPositionsResponse | string> => {
  try {
    return (await axios.get(`${baseURL}positions`)).data
  } catch (e) {
    return e.message
  }
}

const registration = async (
  name: string,
  email: string,
  phone: string,
  position: number,
  image: File,
  token: string,
): Promise<TResponse | string> => {
  try {
    const headers = { Token: token, 'Content-Type': 'multipart/form-data' }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('position_id', String(position))
    formData.append('photo', image)
    const response = (
      await axios.post(`${baseURL}users`, formData, { headers })
    ).data
    return response
  } catch (e) {
    console.log(e)
    return e.message
  }
}

export default {
  getToken,
  getData,
  getUsers,
  getPositions,
  registration,
}
