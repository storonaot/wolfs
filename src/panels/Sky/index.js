import React, { useState } from 'react'
import {
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
  },

  {
    type: Tabs.SELL,
    title: 'Продать',
    count: 68,
    startPrice: 11.34,
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

const Sky = ({ id, title }) => {
  const [activeTab, setActiveTab] = useState(tabsArr[0])

  return (
    <Panel id={id}>
      <PanelHeader title={title} />
      <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      <Separator />
      <Group mode="plain">
        <SimpleCell
          indicator={<Link>Показать все</Link>}
          description={`Начальная цена: ${activeTab.startPrice} руб.`}
        >
          <Title weight="medium" level="2">
            {activeTab.title} <span className={s.count}>{activeTab.count}</span>
          </Title>
        </SimpleCell>
      </Group>
      <Group mode="plain">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: 8,
          }}
        >
          <div>
            <Title weight="bold" level="3" style={{ textAlign: 'center', marginBottom: 7 }}>
              Цена
            </Title>
            <Card>
              <Div>123</Div>
            </Card>
          </div>
          <div>
            <Title weight="bold" level="3" style={{ textAlign: 'center', marginBottom: 7 }}>
              Количество
            </Title>
            <Card>
              <Div>123</Div>
            </Card>
          </div>
        </div>
      </Group>
    </Panel>
  )
}

export default Sky
