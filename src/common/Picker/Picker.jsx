import React from 'react'
import { Avatar, CellButton, ContentCard, Group, Panel, SimpleCell } from '@vkontakte/vkui'
import {
  Icon28ArrowLeftOutline,
  Icon28ArrowRightOutline,
  Icon28CoinsOutline,
} from '@vkontakte/icons'

import s from './styles.module.scss'

const mock = {
  name: 'Кабанов Александр',
  coinsCount: '123',
  price: '15.32',
}

const Picker = ({ id, user, title }) => {
  return (
    <Panel id={id}>
      <ContentCard
        src="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
        header={mock.name}
        text={
          <Group>
            <SimpleCell
              before={<Icon28CoinsOutline />}
              indicator={`${mock.price} ₽`}
            >{`${mock.coinsCount} шт.`}</SimpleCell>
            <div className={s.grid}>
              <CellButton
                before={
                  <Avatar>
                    <Icon28ArrowLeftOutline />
                  </Avatar>
                }
                size="l"
                mode="outline"
              />
              <CellButton
                after={
                  <Avatar>
                    <Icon28ArrowRightOutline />
                  </Avatar>
                }
                size="l"
                mode="outline"
              />
            </div>
          </Group>
        }
        maxHeight={700}
      />
    </Panel>
  )
}

export default Picker
