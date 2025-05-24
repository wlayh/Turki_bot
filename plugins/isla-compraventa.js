import { ensureIslands } from './islas-utils.js'

let handler = async (m, { conn, text, usedPrefix }) => {
    let islands = ensureIslands()
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    let num = text.trim()
    if (!myClan) return m.reply('Debes tener clan.')
    if (!islands[num] || !islands[num].forSale) return m.reply('No está en venta.')
    let vendedor = islands[num].owner
    if (clans[myClan].minerales < islands[num].price) return m.reply('Tu clan no tiene suficientes minerales.')

    clans[myClan].minerales -= islands[num].price
    clans[vendedor].minerales += islands[num].price
    islands[num].owner = myClan
    islands[num].forSale = false
    islands[num].price = 0
    global.db.data.islands = islands
    global.db.data.clans = clans
    m.reply(
        `¡Compraste la isla ${num} para tu clan!\n` +
        `Minerales de la isla:\n` +
        `Hierro: ${islands[num].iron} | Oro: ${islands[num].gold} | Esmeralda: ${islands[num].emerald} | Carbón: ${islands[num].coal} | Piedra: ${islands[num].stone}`
    )
}
handler.tags = ['isla']
handler.help = ['islacomprarventa <id_isla>']
handler.command = ['islacomprarventa']
handler.group = false
export default handler
