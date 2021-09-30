/* eslint-disable no-console */
import React, { useCallback, useContext } from 'react'
import { Avatar, Group, IconButton, Panel, SimpleCell } from '@vkontakte/vkui'
import { Icon28MoneySendOutline } from '@vkontakte/icons'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'

const mock = [
  {
    name: 'Игорь федоров',
    quantity: '420',
    price: '10.34',
  },
  {
    name: 'Игорь федоров2',
    quantity: '420',
    price: '10.34',
  },
  {
    name: 'Игорь федоров3',
    quantity: '420',
    price: '10.34',
  },
  {
    name: 'Игорь федоров4',
    quantity: '420',
    price: '10.34',
  },
  {
    name: 'Игорь федоров5',
    quantity: '420',
    price: '10.34',
  },
]

const BidList = ({ id }) => {
  const { activePanel, setActiveModal } = useContext(AppContext)

  const handleTransaction = useCallback(
    item => () => {
      setActiveModal({
        key: 'transaction',
        props: { bidType: activePanel.props.bidType, item: item },
      })
    },
    [activePanel.props.bidType, setActiveModal],
  )

  return (
    <>
      <PanelHeader goBack="sky">{activePanel.props.bidType}</PanelHeader>
      <Panel id={id}>
        <Group>
          {mock.map(item => {
            return (
              <SimpleCell
                // todo поправить ключ
                key={item.name}
                before={<Avatar src="" />}
                // todo склонение коинов
                description={`${item.quantity} коинов`}
                indicator={`${item.price} ₽`}
                after={
                  <IconButton onClick={handleTransaction(item)}>
                    <Icon28MoneySendOutline />
                  </IconButton>
                }
              >
                {item.name}
              </SimpleCell>
            )
          })}
        </Group>
      </Panel>
    </>
  )
}

export default BidList
