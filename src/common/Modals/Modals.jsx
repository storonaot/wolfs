import React, { useCallback, useContext } from 'react'
import { ModalPage, ModalPageHeader, ModalRoot, PanelHeaderButton } from '@vkontakte/vkui'
import { Icon24Dismiss } from '@vkontakte/icons'

import { BidForm } from '../BidForm'
import { BID_TYPE, MODALS } from '../../constants'
import { AppContext } from '../../context'

const Modals = ({ activeModal }) => {
  const { setActiveModal } = useContext(AppContext)

  const { bidType = BID_TYPE.sell } = activeModal.props

  const handleClose = useCallback(() => {
    setActiveModal({ key: null, props: {} })
  }, [setActiveModal])

  return (
    <ModalRoot
      activeModal={activeModal ? activeModal.key : null}
      onClose={() => {
        setActiveModal({ key: null, props: {} })
      }}
    >
      <ModalPage id="noop" />
      <ModalPage
        id={MODALS.payment}
        settlingHeight={45}
        header={
          <ModalPageHeader
            right={
              <PanelHeaderButton onClick={handleClose}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            }
          >
            {bidType === BID_TYPE.sell ? 'Продать' : 'Купить'}
          </ModalPageHeader>
        }
      >
        <BidForm bidType={bidType} />
      </ModalPage>
    </ModalRoot>
  )
}

export default Modals
