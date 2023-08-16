const user = require("../Users");
const menus = require("../menu/allMenu");
const fs = require("fs-extra");

module.exports = {
  stage: 1,
  async execute({ client, message, from, body }) {
    if (message.type != "chat")
      return client.sendMessage(from, "*Envie uma mensagem de texto.*\n");
    const Users = new user(from);

    let userSelected = await Users.getUser();

    if (body == "#") {
      await Users.update(2);
      await client.sendMessage(
        from,
        'Abaixo está o seu carrinho, após checar o valor total envie um pix para esta chave: *SUA CHAVE PIX*\nNOME DA CHAVE PIX/EMPRESA\n\nApós feito o pix envie o print ou documento do comprovante nesta conversa.\n\nCaso queira cancelar o pedido digite "*".\n'
      );
      let buyText = `Aqui está o resumo do seu pedido.\n\n`;
      let total = 0;
      userSelected.itens.forEach((e) => {
        total = total + e.price;
        buyText += `*${e.description}* no valor de *${e.price} reais*\n`;
      });
      buyText += `\n Seu total foi de *${total} reais*.\n`;
      return await client.sendMessage(from, buyText);
    }
    if (body == "*") {
      await Users.update(0);
      await fs.unlink(`./users/${from}.json`);
      return await client.sendMessage(
        from,
        "*O pedido foi cancelado com sucesso.*\n"
      );
    }
    if (body == "sair" || body == "Sair") {
      await Users.update(3);
      return await client.sendMessage(
        from,
        '*O bot foi desativado, digite "!finalizar" para ativar novamente.*\n'
      );
    }
    if (
      isNaN(body) &&
      body != "#" &&
      body != "*" &&
      body != "sair" &&
      body != "Sair"
    ) {
      client.sendMessage(from, `*Esta opção não existe.*\n`);
    } else {
      let escolha = parseInt(body);
      if (Object.keys(menus[userSelected.menu]).length < escolha)
        return client.sendMessage(from, "Esta opção não existe.\n");
      let itens = menus[userSelected.menu][escolha];
      await Users.update(1, userSelected.menu, itens);
      await client.sendMessage(
        from,
        `Você escolheu a opção *${itens.description}*.\nCaso deseje mais alguma coisa, digite a opção do menu, caso não, digite "#" para finalizar ou "*" para cancelar o pedido.
`
      );
    }
  },
};
