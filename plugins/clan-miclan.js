let handler = async (m, { conn }) => {
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let miClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!miClan) return m.reply('No perteneces a ningún clan.')

    let info = clans[miClan]
    m.reply(
        `🏰 *Tu clan: ${miClan}*\n` +
        `👑 Admin: ${info.admin}\n` +
        `👥 Miembros: ${info.members.length}\n` +
        `⛏️ Minerales: ${info.minerales}\n` +
        `🕺 Seguidores: ${info.seguidores}\n` +
        `🔥 Activos: ${info.activos}`
    )
}
handler.tags = ['clan']
handler.help = ['clanmi']
handler.command = ['clanmi']
handler.group = false
export default handler