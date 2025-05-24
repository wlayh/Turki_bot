let handler = async (m, { conn }) => {
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!myClan) return m.reply('Debes estar en un clan.')
    clans[myClan].minerales = (clans[myClan].minerales || 0) + 50
    global.db.data.clans = clans
    m.reply('Tu clan recibió 50 minerales por ser activo.')
}
handler.tags = ['batalla']
handler.help = ['batallarecompensa']
handler.command = ['batallarecompensa']
handler.group = false
export default handler