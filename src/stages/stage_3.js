const user = require('../Users')
const menus = require('../menu/allMenu')
const fs = require('fs-extra')
module.exports = {
    stage: 3,
    async execute({ client, message, from, body }) {
        const Users = new user(from)
            await Users.update(0)
            await fs.unlink(`./users/${from}.json`);
          return  await client.sendMessage(from, '*O atendimento foi concluido com sucesso*\n')
        }
    }