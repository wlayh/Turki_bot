let handler = async (m, { conn }) => {
    let islands = global.db.data.islands || {}
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!myClan) return m.reply('Debes pertenecer a un clan.')
    let ownIslands = Object.keys(islands).filter(i => islands[i].owner === myClan)
    m.reply(`Islas de tu clan: ${ownIslands.join(', ') || 'Ninguna'}`)
}
handler.tags = ['isla']
handler.help = ['islamias']
handler.command = ['islamias']
handler.group = false
export default handler