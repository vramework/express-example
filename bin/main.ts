import { getConfig } from '../src/config.js'
import { ExpressServer } from '../src/server.js'
import { createSingletonServices } from '../src/services.js'
import { VrameworkTaskScheduler} from '@vramework/schedule'
import { ScheduledTaskNames } from '../.vramework/vramework-schedules.js'
 
async function main(): Promise<void> {
  try {
    const config = await getConfig()
    const singletonServices = await createSingletonServices(config)
    const expressServer = new ExpressServer(singletonServices)
    await expressServer.start()

    const scheduler = new VrameworkTaskScheduler<ScheduledTaskNames>(singletonServices)
    scheduler.startAll()
  } catch (e: any) {
    console.error(e.toString())
    process.exit(1)
  }
}

main()
