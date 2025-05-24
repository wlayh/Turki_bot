let handler = async (m, { conn, text, usedPrefix, isOwner }) => {
    if (!isOwner) return m.reply('Solo los dueños (Owners) pueden crear islas personalizadas.');

    let islands = global.db.data.islands || {};
    let args = text.trim().split('|').map(v => v.trim());
    // Uso: .islacrear <nombre> | <valor/personas> | <minerales> | <recursos extra>
    // Ejemplo: .islacrear IslaMisteriosa | 10 | 500 | oro, diamantes

    if (args.length < 3) {
        return m.reply(
            `Uso: ${usedPrefix}islacrear <nombre> | <personas> | <minerales> | <recursos extra (opcional)>\n` +
            `Ejemplo: ${usedPrefix}islacrear IslaMisteriosa | 10 | 500 | oro, diamantes`
        );
    }

    // Buscar siguiente número disponible
    let nextId = 1;
    while (islands[nextId]) nextId++;

    let [nombre, personas, minerales, recursos] = args;
    personas = parseInt(personas);
    minerales = parseInt(minerales);

    if (!nombre) return m.reply('Debes especificar un nombre para la isla.');
    if (isNaN(personas) || personas < 0) return m.reply('Personas debe ser un número válido.');
    if (isNaN(minerales) || minerales < 0) return m.reply('Minerales debe ser un número válido.');

    let recursosList = recursos ? recursos.split(',').map(v => v.trim()) : [];

    islands[nextId] = {
        owner: null,
        name: nombre,
        minerals: minerales,
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
        `Minerales: ${minerales}\n` +
        `Recursos extra: ${recursosList.length > 0 ? recursosList.join(', ') : 'Ninguno'}`
    );
};
handler.tags = ['isla', 'owner'];
handler.help = ['islacrear <nombre> | <personas> | <minerales> | <recursos (opcional)>'];
handler.command = ['islacrear'];
handler.group = false;
handler.rowner = true; // Solo root/owner puede usarlo
export default handler;
