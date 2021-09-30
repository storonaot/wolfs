/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react'
import bridge from '@vkontakte/vk-bridge'
import {
  AdaptivityProvider,
  AppRoot,
  Epic,
  ScreenSpinner,
  Tabbar,
  TabbarItem,
  View,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { Icon28LinkCircleOutline, Icon28LogoVkOutline, Icon28UsersOutline } from '@vkontakte/icons'

import { AppContext } from './context'
import { ProfilePanel, SkyPanel } from './panels'
// import { signIn } from './api'
import { Modals } from './common/Modals'
import { BidList } from './panels/BidList'

const App = () => {
  const [activePanel, setActivePanel] = useState('profile')
  const [activePopout, setActivePopout] = useState(null)
  const [activeModal, setActiveModal] = useState({ key: null, props: {} }) // todo поставить ключ null когда сделаем кнопку
  const [user, setUser] = useState(null)

  const fetchUser = useCallback(async () => {
    setActivePopout(<ScreenSpinner size="large" />)

    try {
      const _user = await bridge.send('VKWebAppGetUserInfo')

      // eslint-disable-next-line no-console
      console.log('_user', _user)

      setUser(_user)

      // signIn({ ..._user, avatar: _user.photo_200 })
      //   .then(usr => {
      //     // eslint-disable-next-line no-console
      //     console.log('user', usr)
      //     setUser(usr)
      //   })
      //   .finally(() => {
      //     setActivePopout(null)
      //   })
    } catch (error) {
      console.error('error', error.message)
    }
    setActivePopout(null)
  }, [])

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme')

        schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
        document.body.attributes.setNamedItem(schemeAttribute)
      }
    })
  }, [])

  // useEffect(() => {
  //   // bridge.send("VKWebAppGetAuthToken", {"app_id": 6909581, "scope": "friends,status"});
  // }, [])

  useEffect(() => {
    // fetchUser()
  }, [fetchUser])

  const AppContextValue = {
    activePanel,
    setActivePanel,
    activeModal,
    setActiveModal,
  }

  const PAGES = [
    {
      epicIcon: <Icon28LinkCircleOutline />,
      name: 'wtf',
      panel: <SkyPanel id="wtf" title="wtf" />,
      title: 'wtf',
    },
    {
      epicIcon: <Icon28LogoVkOutline />,
      name: 'sky',
      panel: <SkyPanel id="sky" title="/sky" />,
      title: '/sky',
    },
    {
      epicIcon: <Icon28UsersOutline />,
      name: 'profile',
      panel: <ProfilePanel id="profile" title="Профиль" />,
      title: 'Профиль',
    },
    {
      epicIcon: <Icon28UsersOutline />,
      name: 'bidList',
      panel: <BidList id="bidList" title="/sky" />,
    },
  ]

  const tabbar = (
    <Tabbar>
      {PAGES.map(page => {
        if (page.name === 'bidList') return

        return (
          <TabbarItem
            key={page.name}
            onClick={() => setActivePanel(page.name)}
            selected={activePanel === page.name}
            text={page.title}
          >
            {page.epicIcon}
          </TabbarItem>
        )
      })}
    </Tabbar>
  )

  return user ? (
    <ScreenSpinner size="large" />
  ) : (
    <AdaptivityProvider>
      <AppRoot style={{ backgroundColor: '#fff' }}>
        <AppContext.Provider value={AppContextValue}>
          <Epic activeStory={activePanel} tabbar={tabbar}>
            {PAGES.map(page => {
              return (
                <View
                  key={page.name}
                  id={page.name}
                  activePanel={page.name}
                  popout={activePopout}
                  modal={<Modals activeModal={activeModal} />}
                >
                  {page.panel}
                </View>
              )
            })}
          </Epic>
        </AppContext.Provider>
      </AppRoot>
    </AdaptivityProvider>
  )
}

export default App
