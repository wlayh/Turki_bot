let handler = async (m, { conn, args, command }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    // Precios de venta (lo que el jugador recibe)
    let sellPrices = {
        'esmeralda': 150,
        'hierro': 8,
        'oro': 25,
        'carbon': 5,
        'piedra': 2
    };

    // Precios de compra (lo que el jugador paga)
    let buyPrices = {
        'esmeralda': 200,
        'hierro': 12,
        'oro': 35,
        'carbon': 8,
        'piedra': 4
    };

    // Mapeo de nombres alternativos
    let itemMap = {
        'esmeralda': 'emerald',
        'esmeraldas': 'emerald',
        'hierro': 'iron',
        'oro': 'gold',
        'carbon': 'coal',
        'carbón': 'coal',
        'piedra': 'stone',
        'piedras': 'stone'
    };

    let itemNames = {
        'emerald': '💎 Esmeralda',
        'iron': '🔩 Hierro',
        'gold': '🥇 Oro',
        'coal': '⚫ Carbón',
        'stone': '🪨 Piedra'
    };

    // Si no hay argumentos, mostrar la tienda
    if (!args[0]) {
        let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/tienda.jpeg';
        
        let tiendaInfo = `🏪 *TIENDA MÍSTICA* 🏪\n\n` +
            `💰 *Tu dinero*: ${user.coin || 0} monedas\n\n` +
            `📦 *TUS RECURSOS:*\n` +
            `┏━━━━━━━━━━━━━┓\n` +
            `┃ 💎 Esmeralda: ${user.emerald || 0}\n` +
            `┃ 🔩 Hierro: ${user.iron || 0}\n` +
            `┃ 🥇 Oro: ${user.gold || 0}\n` +
            `┃ ⚫ Carbón: ${user.coal || 0}\n` +
            `┃ 🪨 Piedra: ${user.stone || 0}\n` +
            `┗━━━━━━━━━━━━━┛\n\n` +
            `💸 *PRECIOS DE VENTA:*\n` +
            `• 💎 Esmeralda: ${sellPrices.esmeralda} monedas\n` +
            `• 🔩 Hierro: ${sellPrices.hierro} monedas\n` +
            `• 🥇 Oro: ${sellPrices.oro} monedas\n` +
            `• ⚫ Carbón: ${sellPrices.carbon} monedas\n` +
            `• 🪨 Piedra: ${sellPrices.piedra} monedas\n\n` +
            `💰 *PRECIOS DE COMPRA:*\n` +
            `• 💎 Esmeralda: ${buyPrices.esmeralda} monedas\n` +
            `• 🔩 Hierro: ${buyPrices.hierro} monedas\n` +
            `• 🥇 Oro: ${buyPrices.oro} monedas\n` +
            `• ⚫ Carbón: ${buyPrices.carbon} monedas\n` +
            `• 🪨 Piedra: ${buyPrices.piedra} monedas\n\n` +
            `📝 *COMANDOS:*\n` +
            `• .tienda vender [objeto] [cantidad]\n` +
            `• .tienda comprar [objeto] [cantidad]\n\n` +
            `*Ejemplo:* .tienda vender hierro 10`;

        await conn.sendFile(m.chat, img, 'tienda.jpg', tiendaInfo, m);
        await m.react('🏪');
        return;
    }

    let action = args[0].toLowerCase();
    let item = args[1] ? args[1].toLowerCase() : '';
    let cantidad = parseInt(args[2]) || 1;

    if (!['vender', 'comprar'].includes(action)) {
        return conn.reply(m.chat, `❌ Acción no válida. Usa: *vender* o *comprar*`, m);
    }

    if (!item) {
        return conn.reply(m.chat, `❌ Especifica el objeto que quieres ${action}.\n\n*Objetos disponibles:* esmeralda, hierro, oro, carbon, piedra`, m);
    }

    // Convertir nombre del item
    let realItem = itemMap[item] || item;
    if (!itemNames[realItem]) {
        return conn.reply(m.chat, `❌ Objeto no válido: *${item}*\n\n*Objetos disponibles:* esmeralda, hierro, oro, carbon, piedra`, m);
    }

    if (cantidad <= 0) {
        return conn.reply(m.chat, `❌ La cantidad debe ser mayor a 0`, m);
    }

    // VENDER
    if (action === 'vender') {
        let userAmount = user[realItem] || 0;
        
        if (userAmount < cantidad) {
            return conn.reply(m.chat, `❌ No tienes suficiente ${itemNames[realItem]}.\n*Tienes:* ${userAmount}\n*Intentas vender:* ${cantidad}`, m);
        }

        let sellPrice = sellPrices[item] || sellPrices[realItem];
        let totalGain = sellPrice * cantidad;

        user[realItem] -= cantidad;
        user.coin = (user.coin || 0) + totalGain;

        let sellMsg = `✅ *VENTA EXITOSA* ✅\n\n` +
            `📦 *Vendiste:* ${cantidad}x ${itemNames[realItem]}\n` +
            `💰 *Ganaste:* ${totalGain} monedas\n` +
            `💸 *Dinero total:* ${user.coin} monedas\n` +
            `📦 *${itemNames[realItem]} restante:* ${user[realItem]}`;

        await conn.sendMessage(m.chat, { text: sellMsg }, { quoted: m });
        await m.react('💰');
    }

    // COMPRAR
    if (action === 'comprar') {
        let buyPrice = buyPrices[item] || buyPrices[realItem];
        let totalCost = buyPrice * cantidad;
        let userMoney = user.coin || 0;

        if (userMoney < totalCost) {
            return conn.reply(m.chat, `❌ No tienes suficiente ${moneda}.\n*Tienes:* ${userMoney} ${moneda}\n*Necesitas:* ${totalCost} ${moneda}`, m);
        }

        user.coin -= totalCost;
        user[realItem] = (user[realItem] || 0) + cantidad;

        let buyMsg = `✅ *COMPRA EXITOSA* ✅\n\n` +
            `🛒 *Compraste:* ${cantidad}x ${itemNames[realItem]}\n` +
            `💸 *Gastaste:* ${totalCost} monedas\n` +
            `💰 *Dinero restante:* ${user.coin} monedas\n` +
            `📦 *${itemNames[realItem]} total:* ${user[realItem]}`;

        await conn.sendMessage(m.chat, { text: buyMsg }, { quoted: m });
        await m.react('🛒');
    }
}

handler.help = ['tienda', 'shop'];
handler.tags = ['economy'];
handler.command = ['tienda', 'shop', 'store'];
handler.register = true;
handler.group = true;

export default handler;
