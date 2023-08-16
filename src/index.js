const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs-extra')
const user = require('./Users')
const events = require('./events')
const stages = []

const client = new Client({
    authStrategy: new LocalAuth(),   
    puppeteer: {
        headless: false }
});

const monospace = (string) => {
    return '```' + string + '```'
}

let stageFolder = './src/stages'
const folder = fs.readdirSync(stageFolder)

for(file of folder){
    let stageRequired = require(`../src/stages/${file}`)
    stages.push(stageRequired)
}


client.initialize()
events(client)


client.on('message', async message => {
     const { type, body, from  } = message
     if(from.includes('status@broadcast')) return
     if(from.includes('@g.us')) return
     if(type === 'protocol') return

    const Users = new user(from)
    const userObj = await Users.getUser()
    let stage = stages.filter((data) => data.stage == userObj.stage)[0]

    await stage.execute({
        client,
        message,
        from,
        body
    })


})

module.exports = {
    monospace
}