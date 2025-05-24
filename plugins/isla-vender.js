let handler = async (m, { conn, text, usedPrefix }) => {
    let islands = global.db.data.islands || {}
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let [num, price] = text.trim().split(/ +/)
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!myClan) return m.reply('Debes pertenecer a un clan.')
    if (!islands[num] || islands[num].owner !== myClan) return m.reply('No es tu isla.')
    if (clans[myClan].admin !== senderId) return m.reply('Solo el admin puede vender.')
    price = parseInt(price)
    if (isNaN(price) || price <= 0) return m.reply('Precio inválido.')

    islands[num].forSale = true
    islands[num].price = price
    global.db.data.islands = islands
    m.reply(`Pusiste la isla ${num} en venta por ${price} minerales.`)
}
handler.tags = ['isla']
handler.help = ['islavender <id_isla> <precio>']
handler.command = ['islavender']
handler.group = false
export default handler