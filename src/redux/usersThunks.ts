import { AppThunk } from './store'
import usersAPI from '../api/usersAPI'
import { TResponse } from './../types/types'
import {
  setError,
  setToken,
  setTotalPages,
  setTotalUsers,
  setLinks,
  addUsers,
  setUsers,
  setIsLoading,
  setCurrentPage,
  setNextPage,
  setPositions,
  setRegistrationSuccess,
  setRegistrationMessage,
} from './usersSlice'

export const getToken = (): AppThunk => async (dispatch) => {
  try {
    const response = await usersAPI.getToken()
    if (typeof response === 'string') {
      dispatch(setError(response))
    } else if (response.success && response.token) {
      dispatch(setToken(response.token))
    }
  } catch (e) {
    dispatch(setError(e.message))
  }
}

const setDataUsers = (
  response: TResponse | string,
  method: 'add' | 'new' = 'add'
): AppThunk => async (dispatch) => {
  if (typeof response === 'string') dispatch(setError(response))
  else if (response.success === false)
    response.message && dispatch(setError(response.message))
  else {
    response.total_pages && dispatch(setTotalPages(response.total_pages))
    response.total_users && dispatch(setTotalUsers(response.total_users))
    response.links && dispatch(setLinks(response.links))
    const isAddUser = method === 'add'
    response.users &&
      dispatch(isAddUser ? addUsers(response.users) : setUsers(response.users))
    dispatch(setIsLoading(false))
  }
}

export const getUsers = (count?: number, page?: number): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setIsLoading(true))
    const { currentPage, count: countState } = getState().users
    page = page || currentPage
    count = count || countState
    const response = await usersAPI.getUsers(page, count)
    dispatch(setDataUsers(response))
  } catch (e) {
    dispatch(setError(e.message))
  }
}

const updateUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setIsLoading(true))
    const { count } = getState().users
    const currentPage = 1
    dispatch(setCurrentPage(currentPage))
    const response = await usersAPI.getUsers(currentPage, count)
    dispatch(setDataUsers(response, 'new'))
  } catch (e) {
    dispatch(setError(e.message))
  }
}

export const getNexPageUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    const { next_url } = getState().users.links
    if (next_url) {
      dispatch(setIsLoading(true))
      const data = await usersAPI.getData(next_url)
      dispatch(setNextPage())
      dispatch(setDataUsers(data))
      dispatch(setIsLoading(false))
    }
  } catch (e) {
    dispatch(setError(e.message))
  }
}

export const getPositions = (): AppThunk => async (dispatch) => {
  try {
    const response = await usersAPI.getPositions()
    if (typeof response === 'string') dispatch(setError(response))
    else if (response.success)
      response.positions && dispatch(setPositions(response.positions))
  } catch (e) {
    dispatch(setError(e.message))
  }
}

export const register = (
  name: string,
  email: string,
  phone: string,
  position: number,
  image: File
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setRegistrationSuccess(false))
    const token = getState().users.token
    const isValidToken =
      token.value && token.time + token.timeOfExist - Date.now() > 0
    if (!isValidToken) {
      dispatch(getToken())
      dispatch(register(name, email, phone, position, image))
    } else {
      const response = await usersAPI.registration(
        name,
        email,
        phone,
        position,
        image,
        token.value
      )
      if (typeof response === 'string') {
        dispatch(setRegistrationMessage(response))
      } else if (response.success) {
        dispatch(updateUsers())
        dispatch(setRegistrationSuccess(true))
        response.message && dispatch(setRegistrationMessage(response.message))
      } else {
        response.message && dispatch(setRegistrationMessage(response.message))
      }
    }
  } catch (e) {
    dispatch(setError(e.message))
  }
}
