/* eslint-disable no-console */
import React, { useContext, useEffect } from 'react'
import { Panel } from '@vkontakte/vkui'

import { Picker } from '../../common/Picker'
import { getAds } from '../../api'
import { AppContext } from '../../context'

// const mock = {
//   name: 'Кабанов Александр',
//   coinsCount: '123',
//   price: '15.32',
// }

const SellPanel = ({ id }) => {
  const { activePanel } = useContext(AppContext)

  const { bidType } = activePanel.props

  useEffect(() => {
    const fetchAds = async () => {
      const res = await getAds({ type: bidType })

      return res
    }

    console.log(fetchAds())
  }, [bidType])

  return (
    <Panel id={id}>
      <Picker />
    </Panel>
  )
}

export default SellPanel
