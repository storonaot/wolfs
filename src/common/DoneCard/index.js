import React, { useContext } from 'react'
import { Avatar, Button, Div, Title } from '@vkontakte/vkui'

import { AppContext } from '../../context'

import s from './styles.module.scss'

const DoneCard = () => {
  const hhh = useContext(AppContext)

  // eslint-disable-next-line no-console
  console.log('hhh', hhh)

  return (
    <Div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Avatar className={s.avatar} size={72}></Avatar>
      <Title weight="bold" level="2">
        Продажа
      </Title>
      <div>Продажа</div>
      <div>120 коинов /sky · 265,24 ₽</div>
      <div>Аватар стэк</div>
      <div>Андрей, Илья, Алексей и ещё 5 человек</div>
      <Button stretched size="l">
        Готово
      </Button>
    </Div>
  )
}

export default DoneCard
