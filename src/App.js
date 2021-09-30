import React, { useEffect, useState } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { AdaptivityProvider, Epic, Tabbar, TabbarItem, View } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { Icon28LinkCircleOutline, Icon28LogoVkOutline, Icon28UsersOutline } from '@vkontakte/icons'

import { AppContext } from './context'
import { SkyPanel } from './panels'
// import { signIn } from './api'

const App = () => {
  const [activePanel, setActivePanel] = useState('sky')
  const [activePopout] = useState(null) // <ScreenSpinner size='large'/>
  const [, setUser] = useState(null)

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme')

        schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
        document.body.attributes.setNamedItem(schemeAttribute)
      }
    })

    async function fetchData() {
      try {
        const _user = await bridge.send('VKWebAppGetUserInfo')

        setUser(_user)
      } catch (error) {
        console.error('error', error.message)
      }
    }

    fetchData()
  }, [])

  const AppContextValue = {
    activePanel,
    setActivePanel,
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
      panel: <SkyPanel id="profile" title="Профиль" />,
      title: 'Профиль',
    },
  ]

  const tabbar = (
    <Tabbar>
      {PAGES.map(page => {
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

  return (
    <AdaptivityProvider>
      <AppContext.Provider value={AppContextValue}>
        <Epic activeStory={activePanel} tabbar={tabbar}>
          {PAGES.map(page => {
            return (
              <View key={page.name} id={page.name} activePanel={page.name} popout={activePopout}>
                {page.panel}
              </View>
            )
          })}
        </Epic>
      </AppContext.Provider>
    </AdaptivityProvider>
  )
}

export default App
