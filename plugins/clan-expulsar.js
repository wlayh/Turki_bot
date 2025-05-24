let handler = async (m, { conn, text, usedPrefix }) => {
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let expulsado = text.trim()
    let miClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!miClan) return m.reply('No perteneces a ningún clan.')
    if (clans[miClan].admin !== senderId) return m.reply('Solo el admin puede expulsar.')
    if (!clans[miClan].members.includes(expulsado)) return m.reply('Ese usuario no está en tu clan.')

    clans[miClan].members = clans[miClan].members.filter(m => m !== expulsado)
    global.db.data.clans = clans
    m.reply('Miembro expulsado del clan.')
}
handler.tags = ['clan']
handler.help = ['clanexpulsar <id_usuario>']
handler.command = ['clanexpulsar']
handler.group = false
export default handler