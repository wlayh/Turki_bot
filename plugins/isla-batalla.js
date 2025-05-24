let handler = async (m, { conn, text, usedPrefix }) => {
    let islands = global.db.data.islands || {}
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    let num = text.trim()
    if (!myClan) return m.reply('Debes estar en un clan.')
    let isla = islands[num]
    if (!isla || !isla.owner) return m.reply('Isla inválida.')
    if (isla.owner === myClan) return m.reply('Ya tienes esa isla.')
    let rivalClan = isla.owner
    let fuerza1 = clans[myClan].members.length + Math.floor(Math.random() * 5)
    let fuerza2 = clans[rivalClan].members.length + Math.floor(Math.random() * 5)
    if (fuerza1 >= fuerza2) {
        isla.owner = myClan
        global.db.data.islands = islands
        m.reply(`¡Ganaste la isla ${num} al clan ${rivalClan}!`)
    } else {
        m.reply('Perdiste la batalla. ¡Sigue participando!')
    }
}
handler.tags = ['batalla']
handler.help = ['batallaretar <id_isla>']
handler.command = ['batallaretar']
handler.group = false
export default handler