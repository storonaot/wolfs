import React, { useCallback } from 'react'
import { Group, Header, Panel, Separator, SimpleCell } from '@vkontakte/vkui'
import {
  Icon12ArrowDownLeft,
  Icon12ArrowUpRight,
  Icon24MoreHorizontal,
  Icon28PaymentCardOutline,
  Icon28WalletOutline,
} from '@vkontakte/icons'

import PanelHeader from '../../common/PanelHeader'
import { BID_TYPE } from '../../constants'

import s from './styles.module.scss'

const transactions = [
  { id: '1', type: BID_TYPE.buy, count: 120, declined: false, sum: '+265,24 ₽' },
  { id: '2', type: BID_TYPE.sell, count: 120, declined: true, sum: '+0,00 ₽' },
]

const Profile = ({ id, user, title }) => {
  const renderHhh = useCallback((transactionType, declined) => {
    return (
      <div>
        {transactionType === BID_TYPE.sell ? 'Продажа' : 'Покупка'}{' '}
        {declined && (
          <>
            <span> · </span>
            <span className={s.declined}>Отменено</span>
          </>
        )}
      </div>
    )
  }, [])

  return (
    <Panel id={id}>
      <PanelHeader>{title}</PanelHeader>
      <Separator />
      <Group mode="plain" header={<Header>Баланс</Header>}>
        <SimpleCell disabled before={<Icon28WalletOutline />} indicator="1 200 баллов">
          /sky
        </SimpleCell>
        <SimpleCell before={<Icon28PaymentCardOutline />} indicator="146 койнов">
          sys
        </SimpleCell>
      </Group>
      <Group mode="plain" header={<Header>Заявки</Header>}>
        {transactions.map(transaction => {
          return (
            <SimpleCell
              key={transaction.id}
              description={`${transaction.count} коинов sky`}
              indicator={transaction.sum}
              after={<Icon24MoreHorizontal />}
              before={
                transaction.type === BID_TYPE.sell ? (
                  <Icon12ArrowUpRight width={28} height={28} fill="#E64646" />
                ) : (
                  <Icon12ArrowDownLeft width={28} height={28} fill="#4BB34B" />
                )
              }
            >
              {renderHhh(transaction.type, transaction.declined)}
            </SimpleCell>
          )
        })}
      </Group>
    </Panel>
  )
}

export default Profile
