import React, { useCallback, useContext, useRef } from 'react'
import {
  ActionSheet,
  ActionSheetItem,
  Group,
  Header,
  Panel,
  Separator,
  SimpleCell,
} from '@vkontakte/vkui'
import {
  Icon12ArrowDownLeft,
  Icon12ArrowUpRight,
  Icon24MoreHorizontal,
  Icon28DeleteOutline,
  Icon28PaymentCardOutline,
  Icon28WalletOutline,
} from '@vkontakte/icons'

import PanelHeader from '../../common/PanelHeader'
import { BID_TYPE, MODALS } from '../../constants'
import { AppContext } from '../../context'

import s from './styles.module.scss'

const transactions = [
  { id: '1', type: BID_TYPE.buy, count: 120, declined: false, sum: '+265,24 ₽', isDone: false },
  { id: '2', type: BID_TYPE.sell, count: 120, declined: true, sum: '+0,00 ₽', isDone: true },
]

const TransactionItem = ({ transaction }) => {
  const cellRef = useRef(null)
  const { setActivePopout, setActiveModal } = useContext(AppContext)

  const renderText = useCallback((transactionType, declined) => {
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

  const showMore = useCallback(() => {
    if (transaction.isDone) {
      setActivePopout(
        <ActionSheet
          toggleRef={cellRef.current}
          onClose={() => setActivePopout(null)}
          iosCloseItem={
            <ActionSheetItem autoclose mode="cancel">
              Отменить
            </ActionSheetItem>
          }
          popupDirection="top"
        >
          <ActionSheetItem autoclose mode="destructive" before={<Icon28DeleteOutline />}>
            <div className={s.destructiveText}>Удалить заявку</div>
          </ActionSheetItem>
        </ActionSheet>,
      )
    } else {
      setActiveModal({ key: MODALS.done, props: transaction })
    }
  }, [setActiveModal, setActivePopout, transaction])

  return (
    <SimpleCell
      getRootRef={cellRef}
      key={transaction.id}
      onClick={() => showMore()}
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
      {renderText(transaction.type, transaction.declined)}
    </SimpleCell>
  )
}

const Profile = ({ id, user, title }) => {
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
          return <TransactionItem key={transaction.id} transaction={transaction} />
        })}
      </Group>
    </Panel>
  )
}

export default Profile
