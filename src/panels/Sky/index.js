import React, { useState } from 'react'
import {
  Group,
  Link,
  Panel,
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

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(Tabs.BUY)

  return (
    <TabsWrapper>
      <TabsItem
        key={activeTab === Tabs.BUY}
        onClick={() => {
          setActiveTab(Tabs.BUY)
        }}
        selected={activeTab === Tabs.BUY}
      >
        Купить
      </TabsItem>
      <TabsItem
        key={activeTab === Tabs.SELL}
        onClick={() => {
          setActiveTab(Tabs.SELL)
        }}
        selected={activeTab === Tabs.SELL}
      >
        Продать
      </TabsItem>
    </TabsWrapper>
  )
}

const Sky = ({ id, title }) => {
  return (
    <Panel id={id}>
      <PanelHeader title={title} />
      <TabsComponent />
      <Group mode="plain">
        <SimpleCell indicator={<Link>Показать все</Link>} description="Начальная цена: 10,34 руб.">
          <Title weight="medium" level="2">
            Купить <span className={s.count}>152</span>
          </Title>
        </SimpleCell>
      </Group>
    </Panel>
  )
}

export default Sky
