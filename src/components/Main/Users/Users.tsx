import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  setNumberOfUsers,
  users as usersSelector,
  isNextUsersPage as isNextUsersPageSelector,
  isLoading as isLoadingSelector,
} from '../../../redux/usersSlice'

import { getUsers, getNexPageUsers } from '../../../redux/usersThunks'

import Button from '../../UI/Button/Button'
import './Users.scss'
import UsersList from './UsersList/UsersList'

export default function Users() {
  const dispatch = useDispatch()
  const numberOfUsersForLoading = window.innerWidth < 500 ? 3 : 6

  const users = useSelector(usersSelector)
  const isNextUsersPage = useSelector(isNextUsersPageSelector)
  const isLoading = useSelector(isLoadingSelector)

  useEffect(() => {
    let isCancel = false
    if (users.length === 0 && !isCancel) {
      dispatch(setNumberOfUsers(numberOfUsersForLoading))
      dispatch(getUsers())
    }
    return () => {
      isCancel = true
    }
  }, [users, dispatch, numberOfUsersForLoading])

  const sortedUsers = users
    .slice()
    .sort((a, b) => b.registration_timestamp - a.registration_timestamp)
  return (
    <section id='users' className='container users__wrapper'>
      <h6 className='title'>Our cheerful users</h6>
      <p className='description'>
        Attention! Sorting users by registration date
      </p>
      {users.length > 0 && <UsersList users={sortedUsers} />}
      {isNextUsersPage && (
        <Button
          title='Show more'
          disabled={isLoading}
          onClick={() => dispatch(getNexPageUsers())}
        />
      )}
    </section>
  )
}
