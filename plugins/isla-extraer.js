import { ensureIslands } from './islas-utils.js'

let handler = async (m, { conn, text, usedPrefix }) => {
    let user = global.db.data.users[m.sender];
    let clans = global.db.data.clans || {};
    let islands = ensureIslands();
    let senderId = m.sender;

    // Buscar clan
    let myClan = Object.keys(clans).find(c => clans[c].members && clans[c].members.includes(senderId));
    if (!myClan) return m.reply('Debes pertenecer a un clan para extraer minerales de una isla.');

    // Obtener número de isla
    let islaId = text.trim();
    if (!islaId || !islands[islaId]) return m.reply(`Debes escribir el número de la isla de tu clan.\nEjemplo: *${usedPrefix}islaextraer 3*`);
    let isla = islands[islaId];
    if (isla.owner !== myClan) return m.reply('Esa isla no pertenece a tu clan.');

    // Cooldown (por isla)
    if (!isla.lastMine) isla.lastMine = 0;
    let cooldown = 10 * 60 * 1000; // 10 minutos
    if (Date.now() - isla.lastMine < cooldown) {
        let restante = cooldown - (Date.now() - isla.lastMine);
        return m.reply(`⏳ Debes esperar ${msToTime(restante)} para volver a extraer en esta isla.`);
    }

    // Recursos aleatorios obtenidos
    let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 300]);
    let emerald = pickRandom([1, 2, 3]);
    let iron = pickRandom([10, 12, 15, 18, 25]);
    let gold = pickRandom([3, 5, 7, 8, 10]);
    let coal = pickRandom([10, 20, 30, 40, 50]);
    let stone = pickRandom([100, 200, 300, 400, 500]);

    // Suma a usuario
    user.coin += coin;
    user.iron = (user.iron || 0) + iron;
    user.gold = (user.gold || 0) + gold;
    user.emerald = (user.emerald || 0) + emerald;
    user.coal = (user.coal || 0) + coal;
    user.stone = (user.stone || 0) + stone;

    // Suma a isla
    isla.iron = (isla.iron || 0) + iron;
    isla.gold = (isla.gold || 0) + gold;
    isla.emerald = (isla.emerald || 0) + emerald;
    isla.coal = (isla.coal || 0) + coal;
    isla.stone = (isla.stone || 0) + stone;
    isla.minerals = isla.iron + isla.gold + isla.emerald + isla.coal + isla.stone;
    isla.lastMine = Date.now();

    // Suma al clan
    clans[myClan].minerales = (clans[myClan].minerales || 0) + iron + gold + emerald + coal + stone;

    global.db.data.islands = islands;
    global.db.data.clans = clans;

    let msg = `⛏️ *Minería en Isla ${islaId} completada!* ⛏️\n\n` +
        `🎁 *RECURSOS OBTENIDOS:*\n` +
        `💸 *${moneda}*: ${coin}\n` +
        `💎 *Esmeralda*: ${emerald}\n` +
        `🔩 *Hierro*: ${iron}\n` +
        `🥇 *Oro*: ${gold}\n` +
        `⚫ *Carbón*: ${coal}\n` +
        `🪨 *Piedra*: ${stone}\n\n` +
        `✨ Tus minerales, los de la isla y el clan han sido actualizados.`;

    m.reply(msg);
};

handler.help = ['islaextraer <id_isla>'];
handler.tags = ['isla', 'minerales'];
handler.command = ['islaextraer'];
handler.group = true;
handler.register = true;
export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60);
    return minutes + 'm ' + seconds + 's';
}
