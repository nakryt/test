import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

import { TUsers, TLinks, TPositions } from '../types/types'

type TUsersState = {
  isLoading: boolean
  data: TUsers
  positions: TPositions
  totalUsers: number
  error?: string
  currentPage: number
  totalPages: number
  count: number
  links: TLinks
  token: {
    time: number
    timeOfExist: number
    value: string
  }
  registration: {
    success: boolean
    message?: string
  }
}

const initialState: TUsersState = {
  isLoading: true,
  data: [],
  positions: [],
  totalUsers: 0,
  currentPage: 1,
  totalPages: 0,
  count: 6,
  links: {
    prev_url: '',
    next_url: '',
  },
  token: {
    time: Date.now(),
    timeOfExist: 60000 * 40,
    value: '',
  },
  registration: {
    success: false,
  },
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token.time = Date.now()
      state.token.value = payload
    },
    setUsers: (state, { payload }: PayloadAction<TUsers>) => {
      state.data = payload
    },
    addUsers: (state, { payload }: PayloadAction<TUsers>) => {
      state.data = [...state.data, ...payload]
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },
    setPositions: (state, { payload }: PayloadAction<TPositions>) => {
      state.positions = payload
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload
    },
    setNumberOfUsers: (state, { payload }: PayloadAction<number>) => {
      state.count = payload
    },
    setTotalPages: (state, { payload }: PayloadAction<number>) => {
      state.totalPages = payload
    },
    setNextPage: (state) => {
      state.currentPage += 1
    },
    setTotalUsers: (state, { payload }: PayloadAction<number>) => {
      state.totalUsers = payload
    },
    setLinks: (state, { payload }: PayloadAction<TLinks>) => {
      state.links.prev_url = payload.prev_url
      state.links.next_url = payload.next_url
    },
    setRegistrationSuccess: (state, { payload }: PayloadAction<boolean>) => {
      state.registration.success = payload
    },
    setRegistrationMessage: (state, { payload }: PayloadAction<string>) => {
      state.registration.message = payload
    },
  },
})

export const {
  setIsLoading,
  setToken,
  setUsers,
  addUsers,
  setError,
  setNumberOfUsers,
  setCurrentPage,
  setTotalPages,
  setNextPage,
  setTotalUsers,
  setLinks,
  setPositions,
  setRegistrationSuccess,
  setRegistrationMessage,
} = usersSlice.actions

export const isLoading = ({ users }: RootState) => users.isLoading
export const users = ({ users }: RootState) => users.data
export const totalUsers = ({ users }: RootState) => users.totalUsers
export const totalPages = ({ users }: RootState) => users.totalPages
export const positions = ({ users }: RootState) => users.positions
export const isNextUsersPage = ({ users }: RootState) => users.links.next_url
export const registrationSuccess = ({ users }: RootState) =>
  users.registration.success
export const registrationMessage = ({ users }: RootState) =>
  users.registration.message

export default usersSlice.reducer
