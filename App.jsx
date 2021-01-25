import React from 'react'
import { AuthContextProvider } from './src/state/auth.context'
import { ModalContextProvider } from './src/state/modal.context'
import { AspectsContextProvider } from './src/state/aspects.context'
import { ConsiderationsContextProvider } from './src/state/considerations.context'
import { ExplainersContextProvider } from './src/state/explainers.context'
import { NotificationsContextProvider } from './src/state/notifications.context'

import Layout from './src/components/Layout'
import ModalConductor from './src/components/Modals/ModalConductor'
import { ThemeContextProvider } from './src/state/theme.context'

const App = () => (
  <AuthContextProvider>
    <NotificationsContextProvider>
      <ModalContextProvider>
        <AspectsContextProvider>
          <ConsiderationsContextProvider>
            <ExplainersContextProvider>
              <ThemeContextProvider>
                <Layout />
                <ModalConductor />
              </ThemeContextProvider>
            </ExplainersContextProvider>
          </ConsiderationsContextProvider>
        </AspectsContextProvider>
      </ModalContextProvider>
    </NotificationsContextProvider>
  </AuthContextProvider>
)

export default App