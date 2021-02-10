const bcrypt = require('bcryptjs')


module.exports = [
    {
        id: '1',
        name: 'Noname',
        password: bcrypt.hashSync('Noname'),
    },
    {
        id: '2',
        name: 'Meganame',
        password: bcrypt.hashSync('Meganame'),
    }
]