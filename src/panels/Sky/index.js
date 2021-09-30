import React, { useState } from 'react'
import { Panel, TabsItem, Tabs as TabsWrapper } from '@vkontakte/vkui'

// import Header from '../../common/Header'

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
      <TabsComponent />
    </Panel>
  )
}

export default Sky
