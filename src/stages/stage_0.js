const menu = require("../menu/allMenu");
const user = require("../Users");

module.exports = {
  stage: 0,
  async execute({ client, message, from, body }) {
    if (message.type != "chat")
      return client.sendMessage(from, "*Envie uma mensagem de texto.*\n");
    const Users = new user(from);

    if (isNaN(body)) {
      stamp = new Date();
      hours = stamp.getHours();
      if (hours >= 18 && hours < 24) {
        time = "Boa noite";
      } else if (hours >= 12 && hours < 18) {
        time = "Boa tarde";
      } else if (hours >= 0 && hours < 12) {
        time = "Bom dia";
      }
      await client.sendMessage(
        from,
        `Olá, ${time}! Eu sou o *NOME DO SEU BOT*, o assistente virtual da *NOME DA SUA EMPRESA* criado para lhe atender com mais rapidez e fluidez.
        
Para ver mais informações como preços e serviços sobre os jogos com que trabalhamos, digite o número respectivo do jogo na lista abaixo:

1 ⚽ SEU MENU 1
2 🔫 SEU MENU 2
3 👾 SEU MENU 3
4 👑 SEU MENU 4
5 🔅 SEU MENU 5
6 ⚔️ SEU MENU 6

`);
    } else {
      let escolha = parseInt(body);
      Users.update(1, escolha);

      let menuSelected = "";
      Object.keys(menu[escolha]).forEach((value) => {
        let element = menu[escolha][value];
        menuSelected += `${value}${element.description} ---- *${element.price} reais*\n`;
      });

      return client.sendMessage(
        from,
        `Você escolheu o menu *${menu[0][escolha].description}*

${menuSelected}\nDigite a opção ao lado esquerdo das opções.\nCaso queira cancelar o pedido digite "*".\n`
      );
    }
    if (body == "sair" || body == "Sair") await Users.update(3);
  },
};
