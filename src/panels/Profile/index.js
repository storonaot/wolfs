import React, { useCallback, useContext, useRef } from 'react'
import {
  ActionSheet,
  ActionSheetItem,
  Group,
  Header,
  Panel,
  PanelHeaderButton,
  Separator,
  SimpleCell,
} from '@vkontakte/vkui'
import {
  Icon12ArrowDownLeft,
  Icon12ArrowUpRight,
  Icon24MoreHorizontal,
  Icon28AddOutline,
  Icon28DeleteOutline,
  Icon28MoneyRequestOutline,
  Icon28MoneySendOutline,
  Icon28WalletOutline,
} from '@vkontakte/icons'

import PanelHeader from '../../common/PanelHeader'
import { BID_TYPE } from '../../constants'
import { AppContext } from '../../context'

import s from './styles.module.scss'

const claims = [
  { id: '1', type: BID_TYPE.buy, count: 120, declined: false, sum: '+265,24 ₽' },
  { id: '2', type: BID_TYPE.sell, count: 120, declined: true, sum: '+0,00 ₽' },
]

const ClaimItem = ({ claim }) => {
  const cellRef = useRef(null)
  const { setActivePopout } = useContext(AppContext)

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
  }, [setActivePopout])

  return (
    <SimpleCell
      getRootRef={cellRef}
      key={claim.id}
      onClick={() => showMore()}
      description={`${claim.count} коинов sky`}
      indicator={claim.sum}
      after={<Icon24MoreHorizontal />}
      before={
        claim.type === BID_TYPE.sell ? (
          <Icon12ArrowUpRight width={28} height={28} fill="#E64646" />
        ) : (
          <Icon12ArrowDownLeft width={28} height={28} fill="#4BB34B" />
        )
      }
    >
      {renderText(claim.type, claim.declined)}
    </SimpleCell>
  )
}

const Profile = ({ id, user, title }) => {
  const { setActivePopout } = useContext(AppContext)
  const addBtnRef = useRef(null)

  const makeClaim = useCallback(() => {
    setActivePopout(
      <ActionSheet
        toggleRef={addBtnRef.current}
        onClose={() => setActivePopout(null)}
        iosCloseItem={
          <ActionSheetItem autoclose mode="cancel">
            Отменить
          </ActionSheetItem>
        }
        popupDirection="top"
      >
        <ActionSheetItem
          autoclose
          mode="destructive"
          before={<Icon28MoneyRequestOutline fill="#4BB34B" />}
        >
          Купить баллы
        </ActionSheetItem>
        <ActionSheetItem
          autoclose
          mode="destructive"
          before={<Icon28MoneySendOutline fill="#E64646" />}
        >
          Продать баллы
        </ActionSheetItem>
      </ActionSheet>,
    )
  }, [setActivePopout])

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderButton getRootRef={addBtnRef} onClick={makeClaim}>
            <Icon28AddOutline />
          </PanelHeaderButton>
        }
      >
        {title}
      </PanelHeader>
      <Separator />
      <Group mode="plain" header={<Header>Баланс</Header>}>
        <SimpleCell disabled before={<Icon28WalletOutline />} indicator="1 200 баллов">
          /sky
        </SimpleCell>
      </Group>
      <Group
        mode="plain"
        header={
          <Header>
            Активные заявки <span style={{ color: '#818C99' }}>· 2</span>
          </Header>
        }
      >
        {claims.map(claim => {
          return <ClaimItem key={claim.id} claim={claim} />
        })}
      </Group>
    </Panel>
  )
}

export default Profile
