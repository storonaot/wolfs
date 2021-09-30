import React, { useContext } from 'react'
import { PanelHeaderButton, PanelHeader as VKPanelHeader } from '@vkontakte/vkui'
import { Icon28ArrowLeftOutline } from '@vkontakte/icons'

import { AppContext } from '../../context'

const PanelHeader = ({ children, goBack }) => {
  const { setActivePanel } = useContext(AppContext)

  return (
    <VKPanelHeader
      style={{ textAlign: 'center' }}
      separator
      left={
        goBack && (
          <PanelHeaderButton
            onClick={() => {
              setActivePanel(goBack)
            }}
          >
            <Icon28ArrowLeftOutline />
          </PanelHeaderButton>
        )
      }
    >
      {children}
    </VKPanelHeader>
  )
}

export default PanelHeader
