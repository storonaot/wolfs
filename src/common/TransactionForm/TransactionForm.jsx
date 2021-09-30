/* eslint-disable no-console */
import React, { memo, useCallback, useContext, useMemo, useState } from 'react'
import { Avatar, Button, FormItem, FormLayout, Input, SimpleCell } from '@vkontakte/vkui'

import { AppContext } from '../../context'
import { BID_TYPE } from '../../constants'

const TransactionForm = ({ bidType }) => {
  const { activeModal, setActiveModal } = useContext(AppContext)
  const [coinCount, setCoinCount] = useState(0)

  const { item } = activeModal.props

  const formType = useMemo(() => {
    switch (bidType) {
      case BID_TYPE.sell: {
        return {
          price: 'За сколкьо вы готовы продать:',
          quantity: 'Колличество для продажи',
          submit: 'Продать',
        }
      }

      case BID_TYPE.buy: {
        return {
          price: 'Сколкьо вы готовы заплатить:',
          quantity: 'Колличество для покупки',
          submit: 'Купить',
        }
      }
    }
  }, [bidType])

  const handleInputChange = useCallback(event => {
    const { value } = event.currentTarget

    setCoinCount(value)
  }, [])

  const amount = useMemo(() => {
    return coinCount * item?.price
  }, [coinCount, item?.price])

  const handleSubmit = useCallback(() => {
    // TODO дернуть апи
    setActiveModal({ key: null, props: {} })
  }, [setActiveModal])

  return (
    <FormLayout>
      <SimpleCell
        // todo поправить ключ
        before={<Avatar src="" />}
        // todo склонение коинов
        description={`${item?.quantity} коинов`}
        indicator={`+ ${amount} ₽`}
      >
        {item?.name}
      </SimpleCell>
      <FormItem top={formType.quantity}>
        <Input type="text" value={coinCount} onChange={handleInputChange} />
      </FormItem>
      <FormItem>
        <Button size="l" stretched onClick={handleSubmit}>
          {formType.submit}
        </Button>
      </FormItem>
    </FormLayout>
  )
}

export default memo(TransactionForm)
