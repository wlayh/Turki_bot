let handler = async (m, { conn, text, usedPrefix }) => {
    let islands = global.db.data.islands || {}
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    let num = text.trim()
    if (!myClan) return m.reply('Debes tener clan.')
    if (!islands[num] || !islands[num].owner) return m.reply('No puedes atacar esa isla.')
    if (islands[num].owner === myClan) return m.reply('Ya es tuya.')

    if (Math.random() > 0.5) {
        islands[num].owner = myClan
        global.db.data.islands = islands
        m.reply(`¡Tu clan conquistó la isla ${num}!`)
    } else {
        m.reply('¡El ataque falló!')
    }
}
handler.tags = ['isla']
handler.help = ['islaatacar <id_isla>']
handler.command = ['islaatacar']
handler.group = false
export default handler