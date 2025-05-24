let handler = async (m, { conn }) => {
    let clans = global.db.data.clans || {}
    if (Object.keys(clans).length === 0) return m.reply('No hay clanes creados aún.')
    let msg = '*Lista de clanes:*\n'
    for (const c in clans) {
        msg += `- ${c} (${clans[c].members.length} miembros)\n`
    }
    m.reply(msg)
}
handler.tags = ['clan']
handler.help = ['clanlistar']
handler.command = ['clanlistar']
handler.group = false
export default handler