const test = require('ava');
const testAgent = require('supertest');
const createApp = require('../app');
const issueToken = require('./helper/issueToken');
const app = testAgent(createApp());

const authHeader = `Bearer ${issueToken({id: '1'})}`

// test('test test', async t => {
//     const res = await app.get('/user');
//     t.is(res.status, 200)
//     t.truthy(typeof res.text === 'string')    
// })

test('Get list of Users', async t => {
    console.log(authHeader)
    const res = await app.get('/allusers').set('Authorization', authHeader);
    t.is(res.status, 200);
    t.truthy(Array.isArray(res.body))
})

test('Get user by ID', async t => {
    const id = 1
    const res = await app.get(`/user/${id}`).set('Authorization', authHeader);
    t.is(res.status, 200);
    t.is(res.body.name, 'Noname')
    
})

test('Get user with invalid ID', async t => {
    const invalidId = 777;
    const res = await app.get(`/user/${invalidId}`).set('Authorization', authHeader)
    t.is(res.status, 404)
})


