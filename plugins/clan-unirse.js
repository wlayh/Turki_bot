let handler = async (m, { conn, text, usedPrefix }) => {
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let clanName = text.trim()

    if (!clanName) return m.reply(`Debes escribir el nombre del clan al que te quieres unir.\nEjemplo: *${usedPrefix}clanunirse LosGuerreros*`)
    if (!clans[clanName]) return m.reply(`Ese clan no existe.`)
    if (clans[clanName].members.includes(senderId)) return m.reply(`Ya eres miembro de ese clan.`)

    for (const c in clans) clans[c].members = clans[c].members.filter(m => m !== senderId)
    clans[clanName].members.push(senderId)
    global.db.data.clans = clans

    m.reply(`Te has unido al clan *${clanName}*`)
}
handler.tags = ['clan']
handler.help = ['clanunirse <nombre>']
handler.command = ['clanunirse']
handler.group = false
export default handler