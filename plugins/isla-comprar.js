let handler = async (m, { conn, text, usedPrefix }) => {
    let islands = global.db.data.islands || {}
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    let num = text.trim()
    if (!myClan) return m.reply('Debes pertenecer a un clan.')
    if (!islands[num]) return m.reply('Isla no existe.')
    if (islands[num].owner) return m.reply('Esa isla ya tiene dueño.')

    islands[num].owner = myClan
    global.db.data.islands = islands
    m.reply(`¡La isla ${num} ahora pertenece al clan ${myClan}!`)
}
handler.tags = ['isla']
handler.help = ['islacomprar <id_isla>']
handler.command = ['islacomprar']
handler.group = false
export default handler