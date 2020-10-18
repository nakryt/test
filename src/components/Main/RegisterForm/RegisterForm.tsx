import React, { useState, useRef, useEffect } from 'react'
import './RegisterForm.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  positions as positionsSelector,
  registrationSuccess as registrationSuccessSelector,
  setRegistrationSuccess,
} from '../../../redux/usersSlice'
import {
  register as registerUser,
  getPositions,
} from '../../../redux/usersThunks'
import { useForm, Controller } from 'react-hook-form'
import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'

type TForm = {
  name: string
  email: string
  phone: string
  position: string
  photo: File
}

export default function RegisterForm() {
  const dispatch = useDispatch()
  const phoneInputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    let isCancel = false
    if (!isCancel) dispatch(getPositions())
    return () => {
      isCancel = true
    }
  }, [dispatch])

  const positions = useSelector(positionsSelector)
  const photoRef = useRef<HTMLInputElement | null>(null)
  const [photo, setPhoto] = useState<File | null>(null)

  const {
    register,
    errors,
    handleSubmit,
    control,
    setError,
    setValue,
  } = useForm<TForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const registrationSuccess = useSelector(registrationSuccessSelector)
  const onSubmit = async ({ name, email, phone, position }: TForm) => {
    if (photo) {
      if (photo.type !== 'image/jpeg') {
        setError('photo', {
          message: 'Error: Only jpeg files',
          type: 'validate',
        })
      } else if (photo.size > 5242880) {
        setError('photo', {
          message: 'Error: max size of file is 5Mb',
          type: 'validate',
        })
      } else {
        dispatch(
          registerUser(
            name,
            email,
            phone.replace(/\s/g, ''),
            Number(position),
            photo
          )
        )
      }
    }
  }
  useEffect(() => {
    if (registrationSuccess) {
      setValue('name', '')
      setValue('email', '')
      setValue('phone', '')
      setValue('position', '1')
      setPhoto(null)
    }
  }, [registrationSuccess, setValue])

  return (
    <section className='container register-form__wrapper' id='registration'>
      <Modal
        show={registrationSuccess}
        onHide={() => dispatch(setRegistrationSuccess(false))}
      />
      <h3 className='title'>Register to get a work</h3>
      <p className='description'>
        Attention! After successful registration and alert, update the list of
        users in the block from the top
      </p>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <label className='name'>
          Name
          <input
            className={'input ' + (errors.name ? 'input__error' : '')}
            name='name'
            type='text'
            defaultValue=''
            ref={register({
              required: 'Error',
              minLength: { value: 2, message: 'Error: Minimum 2 symbols' },
              maxLength: { value: 60, message: 'Error: Maximum 60 symbols' },
            })}
            placeholder='Your name'
            required
          />
          {errors.name && <span className='error'>{errors.name.message}</span>}
        </label>
        <label className='email'>
          Email
          <input
            className={'input ' + (errors.email ? 'input__error' : '')}
            name='email'
            type='email'
            defaultValue=''
            ref={register({
              required: 'Error',
              minLength: { value: 2, message: 'Error: Minimum 2 symbols' },
              maxLength: { value: 100, message: 'Error: Maximum 100 symbols' },
              pattern: {
                value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                message: 'Error: enter right email address',
              },
            })}
            placeholder='Your email'
            required
          />
          {errors.email && (
            <span className='error'>{errors.email.message}</span>
          )}
        </label>
        <label className='phone'>
          Phone number
          <Controller
            name='phone'
            render={({ value, onChange, onBlur }) => (
              <input
                ref={phoneInputRef}
                className={'input ' + (errors.phone ? 'input__error' : '')}
                value={value}
                placeholder='+380 XX XXX XX XX'
                required
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  const value = e.currentTarget.value
                  const isNumber = /[0-9]/.test(e.key)

                  const isSpace = (method: 'input' | 'delete') => {
                    const inp = [4, 7, 11, 14]
                    const del = [6, 9, 13, 16]
                    return method === 'input'
                      ? inp.some((i) => i === value.length)
                      : del.some((i) => i === value.length)
                  }

                  if (e.key === 'Backspace')
                    onChange(value.slice(0, isSpace('delete') ? -2 : -1))
                  else if (value.length === 0 && e.key === '+') onChange(e.key)
                  else if (isNumber && value.length > 0 && value.length < 17)
                    onChange(value + (isSpace('input') ? ' ' + e.key : e.key))
                }}
                onChange={() => {}}
                onBlur={onBlur}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.length === 0) {
                    e.currentTarget.value = '+380 '
                  }
                }}
              />
            )}
            control={control}
            defaultValue=''
            rules={{
              required: 'Error',
              pattern: {
                value: /^\+380\s\d{2}\s\d{3}(\s\d{2}){2}/,
                message: 'Error: enter right phone number',
              },
            }}
          />
          {errors.phone ? (
            <span className='error'>{errors.phone.message}</span>
          ) : (
            <span className='phone__description'>
              Enter phone number in open format
            </span>
          )}
        </label>
        {positions.length > 0 && (
          <div className='position'>
            <p>Select your position</p>
            {positions.map(({ id, name }, index) => {
              return (
                <label key={id}>
                  <input
                    type='radio'
                    name='position'
                    value={String(id)}
                    ref={register}
                    defaultChecked={index === 0}
                    required
                  />
                  <span className='radio-picker'></span>
                  {name}
                </label>
              )
            })}
          </div>
        )}

        <label className='file-upload'>
          Photo
          <div
            className={
              'file-upload__wrapper visual ' +
              (errors.photo ? 'input__error' : '')
            }
          >
            {photo ? photo.name : 'Upload your photo'}
            <Controller
              name='photo'
              render={({ value, onChange, onBlur }) => (
                <input
                  type='file'
                  ref={photoRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file =
                      e.currentTarget?.files && e.currentTarget?.files[0]
                    file && setPhoto(file)

                    onChange(e)
                  }}
                  onBlur={onBlur}
                  value={value}
                  required
                />
              )}
              control={control}
              defaultValue=''
              rules={{
                required: 'Error',
              }}
            />

            <button
              className='file-upload__button'
              type='button'
              onClick={() => photoRef.current?.click()}
              tabIndex={-1}
            >
              Browse
            </button>
          </div>
          {errors.photo && (
            // @ts-ignore
            <span className='error'>{errors.photo.message}</span>
          )}
        </label>

        <Button type='submit' title='Sign up now' />
      </form>
    </section>
  )
}
