const { resolve } = require('path');
const { find: findEntry, reject } = require('lodash')
const config = require('../config/config')

let refreshTokens = require(resolve(
    __dirname,
    '..',     
    config.connection,
    'refreshTokens.js'
))

async function add(data) {
    return refreshTokens.push(data)
}
async function findByToken(query) {
    return findEntry(refreshTokens, query)
}
async function remove(query) {
    refreshTokens = reject(refreshTokens, query)
}
module.exports = {
    add,
    findByToken,
    remove
}