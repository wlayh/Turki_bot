import { ensureIslands } from './islas-utils.js'

let handler = async (m, { conn, text, usedPrefix, isOwner }) => {
    if (!isOwner) return m.reply('Solo los dueños (Owners) pueden crear islas personalizadas.');

    let islands = ensureIslands();
    let args = text.trim().split('|').map(v => v.trim());
    // Uso: .islacrear <nombre> | <personas> | <hierro> | <oro> | <esmeralda> | <carbón> | <piedra> | <recursos extra>
    // Ejemplo: .islacrear IslaMisteriosa | 10 | 120 | 80 | 10 | 200 | 600 | oro, diamantes

    if (args.length < 7) {
        return m.reply(
            `Uso: ${usedPrefix}islacrear <nombre> | <personas> | <hierro> | <oro> | <esmeralda> | <carbón> | <piedra> | <recursos extra (opcional)>\n` +
            `Ejemplo: ${usedPrefix}islacrear IslaMisteriosa | 10 | 120 | 80 | 10 | 200 | 600 | oro, diamantes`
        );
    }

    // Buscar siguiente número disponible
    let nextId = 1;
    while (islands[nextId]) nextId++;

    let [nombre, personas, iron, gold, emerald, coal, stone, recursos] = args;
    personas = parseInt(personas);
    iron = parseInt(iron);
    gold = parseInt(gold);
    emerald = parseInt(emerald);
    coal = parseInt(coal);
    stone = parseInt(stone);

    if (!nombre) return m.reply('Debes especificar un nombre para la isla.');
    if ([personas, iron, gold, emerald, coal, stone].some(x => isNaN(x) || x < 0))
        return m.reply('Todos los valores de personas y minerales deben ser números válidos.');

    let recursosList = recursos ? recursos.split(',').map(v => v.trim()) : [];

    islands[nextId] = {
        owner: null,
        name: nombre,
        minerals: iron + gold + emerald + coal + stone,
        iron,
        gold,
        emerald,
        coal,
        stone,
        people: personas,
        forSale: false,
        price: 0,
        miners: 0,
        hunters: 0,
        fishers: 0,
        followers: 0,
        resources: recursosList
    };
    global.db.data.islands = islands;

    m.reply(
        `✅ Isla creada correctamente:\n` +
        `ID: ${nextId}\n` +
        `Nombre: ${nombre}\n` +
        `Personas: ${personas}\n` +
        `Hierro: ${iron}\n` +
        `Oro: ${gold}\n` +
        `Esmeralda: ${emerald}\n` +
        `Carbón: ${coal}\n` +
        `Piedra: ${stone}\n` +
        `Recursos extra: ${recursosList.length > 0 ? recursosList.join(', ') : 'Ninguno'}`
    );
};
handler.tags = ['isla', 'owner'];
handler.help = ['islacrear <nombre> | <personas> | <hierro> | <oro> | <esmeralda> | <carbón> | <piedra> | <recursos (opcional)>'];
handler.command = ['islacrear'];
handler.group = false;
handler.rowner = true;
export default handler;
