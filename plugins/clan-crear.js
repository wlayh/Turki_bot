let handler = async (m, { conn, text, usedPrefix }) => {
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let clanName = text.trim()

    if (!clanName) return m.reply(`Debes poner el nombre del clan.\nEjemplo: *${usedPrefix}clancrear LosGuerreros*`)
    if (clans[clanName]) return m.reply(`Ese clan ya existe. Elige otro nombre.`)

    // Salir de otros clanes
    for (const c in clans) clans[c].members = clans[c].members.filter(m => m !== senderId)
    clans[clanName] = { admin: senderId, members: [senderId], minerales: 0, activos: 0, recompensas: [], seguidores: 0 }
    global.db.data.clans = clans

    m.reply(`✅ ¡Clan creado!\nNombre: *${clanName}*\nEres el admin. Usa ${usedPrefix}clanmi para ver detalles.`)
}
handler.tags = ['clan']
handler.help = ['clancrear <nombre>']
handler.command = ['clancrear']
handler.group = false
export default handler