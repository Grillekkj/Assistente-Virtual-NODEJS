const fs = require('fs-extra')

class user {
    constructor(id) {
        this.id = id
    }
    async wiriteUser(obj) {
        await fs.writeFile(`./users/${this.id}.json`, JSON.stringify(obj, null, 2))
    }
    async getUser() {
        const file = `./users/${this.id}.json`
        const fileExists = await fs.existsSync(file)
        const obj = 
        {
            id: this.id,
            stage: 0,
            menu: 0,
            itens: []
        }

        if (!fileExists) {
            await this.wiriteUser(obj)
            return obj
        }
        const data = await fs.readFileSync(file, 'utf-8')
        console.log(data ? data : obj)
        if(data) return JSON.parse(data)
        return obj
    }
    /**
     * 
     * @param {Number} Stage 
     * @param {Array} itens 
     */
    async update(Stage, menu, itens) {
        const data = await this.getUser(this.id)
        data.stage = Stage
        if(!data?.itens) data.itens = []
        itens ? data.itens.push(itens) : itens = []
        data.menu = menu
        await this.wiriteUser(data)
    }
}

module.exports = user