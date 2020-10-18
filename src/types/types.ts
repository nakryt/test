export type TUser = {
  id: number
  name: string
  email: string
  phone: string
  position: string
  position_id: number
  registration_timestamp: number
  photo: string
}

export type TUsers = Array<TUser>

export type TLinks = {
  next_url: string | null
  prev_url: string | null
}

export type TResponse = {
  success: boolean
  page?: number
  total_pages?: number
  total_users?: number
  count?: number
  links?: TLinks
  message?: string
  fails?: string
  users?: TUsers
  token?: string
}

export type TPosition = {
  id: number
  name: string
}

export type TPositions = Array<TPosition>
export type TPositionsResponse = {
  success: boolean
  positions?: TPositions
  message?: string
}
