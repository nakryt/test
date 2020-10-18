import React from 'react'
import './UsersList.scss'
import { TUsers } from '../../../../types/types'
import UserItem from './UserCard/UserCard'

type Props = {
  users: TUsers
}
export default function UsersList({ users }: Props) {
  return (
    <div className="users__list">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )
}
