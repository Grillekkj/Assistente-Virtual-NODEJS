const user = require('../Users')
const menus = require('../menu/allMenu')
const fs = require('fs-extra')
module.exports = {
    stage: 2,
    async execute({ client, message, from, body }) {
        const Users = new user(from)
        if(body == '*'){
            await Users.update(0)
            await fs.unlink(`./users/${from}.json`);
          return  await client.sendMessage(from, '*O pedido foi cancelado com sucesso.*\n')
        }
        if(message.type == 'image' || message.type == 'document') {
            await message.react('👍')
            await client.sendMessage(from, `Um dos nossos atendentes irá entrar em contato com você em breve para liberar suas compras. ( *Atendimento de domingo a quinta-feira de 12:00 ás 00:00. Sexta-feira e sábado de 12:00 às 19:00* )
*Obrigado pela preferência*.
`)
await Users.update(3)
        }
        if(body == '!finalizar' || body == '!Finalizar'){
            await Users.update(0)
            await fs.unlink(`./users/${from}.json`);
          return  await client.sendMessage(from, '*O pedido foi concluido com sucesso*\n')
        }
    }
}

   
