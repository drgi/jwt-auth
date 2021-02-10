const { resolve } = require('path');
const { find: findEntry } = require('lodash')
const config = require('../config/config')

const users = require(resolve(
    __dirname,
    '..',     
    config.connection,
    'users.js'
))

function allUsers() {
    return users
}

function findById(id) {
    return findEntry(users, id)
}
module.exports = {
    allUsers,
    findById
}