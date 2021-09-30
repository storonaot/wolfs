import React from 'react'
import { PanelHeader as VKPanelHeader } from '@vkontakte/vkui'

const PanelHeader = ({ children, before }) => {
  return (
    <VKPanelHeader style={{ textAlign: 'center' }} separator left={before}>
      {children}
    </VKPanelHeader>
  )
}

export default PanelHeader
