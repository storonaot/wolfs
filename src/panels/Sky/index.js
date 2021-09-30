/* eslint-disable no-console */
import React, { useCallback, useContext, useState } from 'react'
import {
  Button,
  Card,
  Div,
  Group,
  Link,
  Panel,
  Separator,
  SimpleCell,
  TabsItem,
  Tabs as TabsWrapper,
  Title,
} from '@vkontakte/vkui'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'
import { BID_TYPE } from '../../constants'

import s from './styles.module.scss'

const tabsArr = [
  {
    type: BID_TYPE.buy,
    title: 'Купить',
    count: 152,
    startPrice: 10.34,
    actionMode: 'commerce',
  },

  {
    type: BID_TYPE.sell,
    title: 'Продать',
    count: 68,
    startPrice: 11.34,
    actionMode: 'destructive',
  },
]

const TabsComponent = ({ activeTab, setActiveTab }) => {
  return (
    <TabsWrapper>
      {tabsArr.map(tab => {
        console.log('activeTab', activeTab)
        console.log('tab.type', tab.type)

        return (
          <TabsItem
            key={tab.type}
            onClick={() => {
              setActiveTab(tab)
            }}
            selected={activeTab.type === tab.type}
          >
            {tab.title}
          </TabsItem>
        )
      })}
    </TabsWrapper>
  )
}

const prices = ['10,34 ₽', '10,35 ₽', '10,36 ₽', '10,37 ₽', '10,38 ₽']
const counts = [1, 56, 2, 4, 134]

const Stat = () => {
  return (
    <Group mode="plain">
      <div className={s.statWrapper}>
        <div>
          <Title weight="bold" level="3" className={s.title}>
            Цена
          </Title>
          <Card>
            <Div className={s.valueList}>
              {prices.map((price, index) => {
                return (
                  <div key={index}>
                    <span className={s.value}>{price}</span>
                    {index !== prices.length - 1 && <Separator wide className={s.separator} />}
                  </div>
                )
              })}
            </Div>
          </Card>
        </div>
        <div>
          <Title weight="bold" level="3" style={{ textAlign: 'center', marginBottom: 7 }}>
            Количество
          </Title>
          <Card>
            <Div className={s.valueList}>
              {counts.map((item, index) => {
                return (
                  <div key={index}>
                    <span className={s.value}>{item}</span>
                    {index !== counts.length - 1 && <Separator wide className={s.separator} />}
                  </div>
                )
              })}
            </Div>
          </Card>
        </div>
      </div>
    </Group>
  )
}

const Sky = ({ id, title }) => {
  const [activeTab, setActiveTab] = useState(tabsArr[0])
  const { setActivePanel, setActiveModal } = useContext(AppContext)

  const handleOpenAll = useCallback(() => {
    setActivePanel('bidList')
  }, [setActivePanel])

  const handleTransaction = useCallback(() => {
    console.log('set modal')
    setActiveModal({ key: 'payment', props: { bidType: activeTab.type } })
  }, [activeTab.type, setActiveModal])

  return (
    <Panel className={s.panel} id={id}>
      <PanelHeader>{title}</PanelHeader>
      <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      <Separator />
      <div className={s.content}>
        <Group mode="plain">
          <SimpleCell
            after={<Link onClick={handleOpenAll}>Показать все</Link>}
            description={`Начальная цена: ${activeTab.startPrice} руб.`}
          >
            {/* <Title weight="medium" level="2">
              {activeTab.title} <span className={s.count}>{activeTab.count}</span>
            </Title> */}
            {activeTab.title} <span className={s.count}>{activeTab.count}</span>
          </SimpleCell>
        </Group>
        <Stat />
        <Div className={s.buttonWrapper}>
          <Button stretched size="l" mode={activeTab.actionMode} onClick={handleTransaction}>
            {activeTab.title}
          </Button>
        </Div>
      </div>
    </Panel>
  )
}

export default Sky
