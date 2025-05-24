let handler = async (m, { conn, text, usedPrefix }) => {
    let islands = global.db.data.islands || {}
    let id = text.trim()
    let isla = islands[id]
    if (!isla) return m.reply('Esa isla no existe.')
    m.reply(
        `Isla ${id}:\n` +
        `Dueño: ${isla.owner || 'Sin dueño'}\n` +
        `Minerales: ${isla.minerals}\n` +
        `Personas/esclavos: ${isla.people || 0}\n` +
        `Mineros: ${isla.miners || 0}\n` +
        `Cazadores: ${isla.hunters || 0}\n` +
        `Pescadores: ${isla.fishers || 0}\n` +
        `Seguidores: ${isla.followers || 0}`
    )
}
handler.tags = ['isla']
handler.help = ['islasinfo <id_isla>']
handler.command = ['islasinfo']
handler.group = false
export default handler





