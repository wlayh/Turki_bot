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
        let tiendaInfo = `🏪 **TIENDA MÍSTICA** 🏪\n\n` +
            `💰 *Tu ${moneda}*: ${user.coin || 0}\n\n` +
            `📦 **TUS RECURSOS:**\n` +
            `┏━━━━━━━━━━━━━┓\n` +
            `┃ 💎 Esmeralda: ${user.emerald || 0}\n` +
            `┃ 🔩 Hierro: ${user.iron || 0}\n` +
            `┃ 🥇 Oro: ${user.gold || 0}\n` +
            `┃ ⚫ Carbón: ${user.coal || 0}\n` +
            `┃ 🪨 Piedra: ${user.stone || 0}\n` +
            `┗━━━━━━━━━━━━━┛\n\n` +
            `💸 **PRECIOS DE VENTA:**\n` +
            `• 💎 Esmeralda: ${sellPrices.esmeralda} ${moneda}\n` +
            `• 🔩 Hierro: ${sellPrices.hierro} ${moneda}\n` +
            `• 🥇 Oro: ${sellPrices.oro} ${moneda}\n` +
            `• ⚫ Carbón: ${sellPrices.carbon} ${moneda}\n` +
            `• 🪨 Piedra: ${sellPrices.piedra} ${moneda}\n\n` +
            `💰 **PRECIOS DE COMPRA:**\n` +
            `• 💎 Esmeralda: ${buyPrices.esmeralda} ${moneda}\n` +
            `• 🔩 Hierro: ${buyPrices.hierro} ${moneda}\n` +
            `• 🥇 Oro: ${buyPrices.oro} ${moneda}\n` +
            `• ⚫ Carbón: ${buyPrices.carbon} ${moneda}\n` +
            `• 🪨 Piedra: ${buyPrices.piedra} ${moneda}\n\n` +
            `📝 **COMANDOS:**\n` +
            `• *${usedPrefix}tienda vender [objeto] [cantidad]*\n` +
            `• *${usedPrefix}tienda comprar [objeto] [cantidad]*\n\n` +
            `**Ejemplo:** *${usedPrefix}tienda vender hierro 10*`;

        return conn.sendMessage(m.chat, { text: tiendaInfo }, { quoted: fkontak });
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

        let sellMsg = `✅ **VENTA EXITOSA** ✅\n\n` +
            `📦 *Vendiste:* ${cantidad}x ${itemNames[realItem]}\n` +
            `💰 *Ganaste:* ${totalGain} ${moneda}\n` +
            `💸 *${moneda} total:* ${user.coin}\n` +
            `📦 *${itemNames[realItem]} restante:* ${user[realItem]}`;

        await conn.sendMessage(m.chat, { text: sellMsg }, { quoted: fkontak });
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

        let buyMsg = `✅ **COMPRA EXITOSA** ✅\n\n` +
            `🛒 *Compraste:* ${cantidad}x ${itemNames[realItem]}\n` +
            `💸 *Gastaste:* ${totalCost} ${moneda}\n` +
            `💰 *${moneda} restante:* ${user.coin}\n` +
            `📦 *${itemNames[realItem]} total:* ${user[realItem]}`;

        await conn.sendMessage(m.chat, { text: buyMsg }, { quoted: fkontak });
        await m.react('🛒');
    }
}

handler.help = ['tienda', 'shop'];
handler.tags = ['economy'];
handler.command = ['tienda', 'shop', 'store'];
handler.register = true;
handler.group = true;

export default handler;
