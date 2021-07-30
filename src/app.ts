import { Server } from './server'

import { createContainer } from './configs/ioc'
;(async (): Promise<void> => {
  const container = await createContainer()
  const server = container.resolve('server') as Server
  server.start()
})()
