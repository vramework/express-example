import { test, describe, beforeEach } from 'node:test'
import * as assert from 'node:assert'
import * as request from 'supertest'
import { LogLevel } from '@vramework/core/services'
import { ExpressServer } from '../src/server.js'

const setupTestAgent = async () => {
  const vrameworkServer = new ExpressServer()
  vrameworkServer.logger.setLevel(LogLevel.critical)
  await vrameworkServer.start()

  const agent = request.agent(vrameworkServer.server)

  await agent
    .post('/book')
    .send({
      title: 'Writing tests with vramework',
      author: 'Vramework',
      year: 2024,
    })
    .expect(200)

  await agent
    .post('/book')
    .send({
      title: 'Writing different with vramework',
      author: 'Vramework',
      year: 2023,
    })
    .expect(200)

  return agent
}

describe('Books', () => {
  let agent: request.Agent

  beforeEach(async () => {
    agent = await setupTestAgent()
  })

  test('creates books', async () => {
    const response = await agent.post('/book').send({
      title: 'Writing a third book with vramework',
      author: 'Vramework',
      year: 2023,
    })

    assert.strictEqual(response.status, 200)
  })

  test('gets books', async () => {
    const response = await agent.get('/books')

    assert.strictEqual(response.status, 200)
    assert.deepStrictEqual(response.body, [
      {
        id: '1',
        title: 'Writing tests with vramework',
        author: 'Vramework',
        year: 2024,
      },
      {
        id: '2',
        title: 'Writing different with vramework',
        author: 'Vramework',
        year: 2023,
      },
    ])
  })

  test('gets one book', async () => {
    const response = await agent.get('/book/1')

    assert.strictEqual(response.status, 200)
    assert.deepStrictEqual(response.body, {
      id: '1',
      title: 'Writing tests with vramework',
      author: 'Vramework',
      year: 2024,
    })
  })

  test('updates one book', async () => {
    await agent.patch('/book/1').send({
      author: 'Bob Simons',
      year: 2023,
    })

    const response = await agent.get('/book/1')

    assert.strictEqual(response.status, 200)
    assert.deepStrictEqual(response.body, {
      id: '1',
      title: 'Writing tests with vramework',
      author: 'Bob Simons',
      year: 2023,
    })
  })

  test('deletes one book', async () => {
    const deleteResponse = await agent.del('/book/1')

    assert.strictEqual(deleteResponse.status, 200)

    const response = await agent.get('/book/1')
    assert.strictEqual(response.status, 404)
  })
})
