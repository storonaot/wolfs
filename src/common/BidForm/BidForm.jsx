import React, { memo, useCallback, useContext, useMemo, useState } from 'react'
import { Button, FormItem, FormLayout, Input } from '@vkontakte/vkui'

import { AppContext } from '../../context'
import { BID_TYPE } from '../../constants'

const BidForm = ({ bidType }) => {
  const { setActiveModal } = useContext(AppContext)
  const [coinCount, setCoinCount] = useState(0)

  const formType = useMemo(() => {
    switch (bidType) {
      case BID_TYPE.sell: {
        return {
          price: 'За сколкьо вы готовы продать:',
          quantity: 'Сколько вы хотите продать:',
          submit: 'Продать',
        }
      }

      case BID_TYPE.buy: {
        return {
          price: 'Сколкьо вы готовы заплатить:',
          quantity: 'Сколько вы хотите купить:',
          submit: 'Купить',
        }
      }
    }
  }, [bidType])

  const handleInputChange = useCallback(event => {
    const { value } = event.currentTarget

    setCoinCount(value)
  }, [])

  const handleSubmit = useCallback(() => {
    // TODO дернуть апи
    setActiveModal({ key: null, props: {} })
  }, [setActiveModal])

  return (
    <FormLayout>
      <FormItem top={formType.price}>
        <Input type="text" value={coinCount} onChange={handleInputChange} />
      </FormItem>
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

export default memo(BidForm)
