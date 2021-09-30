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

import s from './styles.module.scss'

const Tabs = {
  BUY: 'buy',
  SELL: 'sell',
}

const tabsArr = [
  {
    type: Tabs.BUY,
    title: 'Купить',
    count: 152,
    startPrice: 10.34,
    actionMode: 'commerce',
  },

  {
    type: Tabs.SELL,
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
              <span className={s.value}>10,34 ₽</span>
              <span className={s.value}>10,34 ₽</span>
              <span className={s.value}>10,34 ₽</span>
              <span className={s.value}>10,34 ₽</span>
              <span className={s.value}>10,34 ₽ и более</span>
            </Div>
          </Card>
        </div>
        <div>
          <Title weight="bold" level="3" style={{ textAlign: 'center', marginBottom: 7 }}>
            Количество
          </Title>
          <Card>
            <Div className={s.valueList}>
              <span className={s.value}>1</span>
              <span className={s.value}>56</span>
              <span className={s.value}>1</span>
              <span className={s.value}>4</span>
              <span className={s.value}>134</span>
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
      <PanelHeader title={title} />
      <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      <Separator />
      <div className={s.content}>
        <Group mode="plain">
          <SimpleCell
            indicator={<Link onClick={handleOpenAll}>Показать все</Link>}
            description={`Начальная цена: ${activeTab.startPrice} руб.`}
          >
            <Title weight="medium" level="2">
              {activeTab.title} <span className={s.count}>{activeTab.count}</span>
            </Title>
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
