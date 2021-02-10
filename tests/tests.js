const test = require('ava');
const testAgent = require('supertest');
const server = require('../app');
const app = testAgent(server);

// test('test test', async t => {
//     const res = await app.get('/user');
//     t.is(res.status, 200)
//     t.truthy(typeof res.text === 'string')    
// })

test('Get list of Users', async t => {
    const res = await app.get('/allusers');
    t.is(res.status, 200);
    t.truthy(Array.isArray(res.body))
})

test('Get user by ID', async t => {
    const id = 1
    const res = await app.get(`/user/${id}`)
    t.is(res.status, 200);
    
})
