const { resolve } = require('path');
const { find: findEntry, reject } = require('lodash')
const config = require('../config/config')

let refreshTokens = require(resolve(
    __dirname,
    '..',     
    config.connection,
    'refreshTokens.js'
))

function add(data) {
    return refreshTokens.push(data)
}
function findByToken(query) {
    return findEntry(refreshTokens, query)
}
function remove(query) {
    refreshTokens = reject(refreshTokens, query)
}
module.exports = {
    add,
    findByToken,
    remove
}