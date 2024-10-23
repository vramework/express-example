import { ExpressServer } from '../src/server'

async function main(): Promise<void> {
  try {
    const expressServer = new ExpressServer()
    await expressServer.start()
  } catch (e: any) {
    console.error(e.toString())
    process.exit(1)
  }
}

main()
