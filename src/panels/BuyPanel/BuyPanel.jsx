/* eslint-disable no-console */
import React from 'react'
import { Panel } from '@vkontakte/vkui'

import { Picker } from '../../common/Picker'

// const mock = {
//   name: 'Кабанов Александр',
//   coinsCount: '123',
//   price: '15.32',
// }

const BuyPanel = ({ id }) => {
  return (
    <Panel id={id}>
      <Picker />
    </Panel>
  )
}

export default BuyPanel
