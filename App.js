import React from 'react'
import { AuthContextProvider } from './src/state/auth.context'
import { ModalContextProvider } from './src/state/modal.context'
import { AspectsContextProvider } from './src/state/aspects.context'
import { ConsiderationsContextProvider } from './src/state/considerations.context'
import { ExplainersContextProvider } from './src/state/explainers.context'

import Layout from './src/assets/Layout'
import Hub from './src/pages/Hub'
import ModalConductor from './src/components/Modals/ModalConductor'

const App = () => {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <AspectsContextProvider>
          <ConsiderationsContextProvider>
            <ExplainersContextProvider>
              <Layout>
                <Hub />
              </Layout>
              <ModalConductor />
            </ExplainersContextProvider>
          </ConsiderationsContextProvider>
        </AspectsContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  )
}

export default App