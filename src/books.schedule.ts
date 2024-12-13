import { addScheduledTask } from '@vramework/core/scheduler'
import { APIFunctionSessionless } from '../.vramework/vramework-types.js'

const myScheduledTask: APIFunctionSessionless<void, void> = async () => {
    console.log(`This is a scheduled task that runs every minute, running now at ${(new Date()).getTime()}`)
}

addScheduledTask({
    name: 'myScheduledTask',
    schedule: '*/1 * * * *',
    func: myScheduledTask
})
