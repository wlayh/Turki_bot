import { ensureIslands } from './islas-utils.js'

let handler = async (m, { conn }) => {
    let islands = ensureIslands()
    let msg = `🏝️ *Lista de todas las islas:*\n\n`
    for (const id of Object.keys(islands)) {
        let isla = islands[id]
        msg += `Isla ${id} (${isla.name || 'Sin nombre'}): `
        if (isla.owner) {
            msg += `🟢 Dueño: ${isla.owner}`
        } else {
            msg += `🔴 Libre`
        }
        if (isla.forSale) msg += ` | 🏷️ En venta por ${isla.price} minerales`
        msg += '\n'
    }
    m.reply(msg)
}
handler.tags = ['isla']
handler.help = ['islaslista']
handler.command = ['islaslista', 'listaislas']
handler.group = false
export default handler
