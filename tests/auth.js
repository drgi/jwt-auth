const test = require('ava');
const testAgent = require('supertest');
const createApp = require('../app');
const app = testAgent(createApp());
const issueToken = require('../tests/helper/issueToken')

test('User can login', async t => {
    const res = await app.post('/auth/login')
                        .send({name: 'Noname', password: 'Noname'})
    t.is(res.status, 200)
    t.truthy(typeof res.body.token === 'string')
    t.truthy(typeof res.body.refreshToken === 'string')
    

})
test('User not found', async t => {
    const res = await app.post('/auth/login').send({name: 'Invalid', password: 'invalid'})
    console.log(res.body);
    t.is(res.status, 404)
    t.truthy(res.body.error)
}) 

test('User gets 403 on invalid login/pass', async t => {
    const res = await app.post('/auth/login').send({name: 'Noname', password: 'invalid'})
    console.log(res.body);
    t.is(res.status, 403)
    t.truthy(res.body.error)
})
 test('User get 401 on expired token', async t => {
    const expToken = issueToken({id: '1'}, {expiresIn: '1ms'})
    const res = await app.get('/user/1').set('Authorization', `Bearer ${expToken}`);
    t.is(res.status, 401)
 })
test('User can refresh token using Refresh Token', async t => {
    const refreshToken = 'TEST_REFRESH_TOKEN'
    const res = await app.post('/auth/refresh').send({id: '1', refreshToken})
    t.is(res.status, 200)
    t.truthy(typeof res.body.token === 'string')
    t.truthy(typeof res.body.refreshToken === 'string')
    
})
test('User can use Refresh Token only one time', async t => {
    const firstRes = await app.post('/auth/refresh').send({id: '2', refreshToken: 'TEST_REFRESH_TOKEN_ONCE'})
    t.is(firstRes.status, 200)
    t.truthy(typeof firstRes.body.token === 'string')
    t.truthy(typeof firstRes.body.refreshToken === 'string')

    const secondRes = await app.post('/auth/refresh').send({id: '2', refreshToken: 'TEST_REFRESH_TOKEN_ONCE'})
    t.is(secondRes.status, 404)
})

test('Multiple refresh token are valid', async t => {
    const firstLogin = await app.post('/auth/login')
                        .send({name: 'Noname', password: 'Noname'})
    t.is(firstLogin.status, 200)
    t.truthy(typeof firstLogin.body.token === 'string')
    t.truthy(typeof firstLogin.body.refreshToken === 'string')
    const seconLogin = await app.post('/auth/login')
                        .send({name: 'Noname', password: 'Noname'})
    t.is(seconLogin.status, 200)
    t.truthy(typeof seconLogin.body.token === 'string')
    t.truthy(typeof seconLogin.body.refreshToken === 'string')


})

test('Refresh Token become invalid after logout', async t => {
    const res = await app.post('/auth/logout').set('Authorization', `Bearer ${issueToken({id: '3'})}`);
    t.is(res.status, 200)
    
    
})

test('Refresh with LogOut User', async t => {
    const refreshToken = 'TEST_REFRESH_LOGOUT'
    const refRes = await app.post('/auth/refresh').send({id: '3', refreshToken})
    t.is(refRes.status, 200)
})

