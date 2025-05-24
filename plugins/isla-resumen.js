import { ensureIslands } from './islas-utils.js'

let handler = async (m, { conn }) => {
    let islands = ensureIslands()
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!myClan) return m.reply('Debes estar en un clan.')
    let totalIron = 0, totalGold = 0, totalEmerald = 0, totalCoal = 0, totalStone = 0, totalPeople = 0, islandsOwned = []
    for (const [id, isla] of Object.entries(islands)) {
        if (isla.owner === myClan) {
            totalIron += (isla.iron || 0)
            totalGold += (isla.gold || 0)
            totalEmerald += (isla.emerald || 0)
            totalCoal += (isla.coal || 0)
            totalStone += (isla.stone || 0)
            totalPeople += (isla.people || 0)
            islandsOwned.push(id)
        }
    }
    m.reply(
        `Clan: ${myClan}\n` +
        `Islas: ${islandsOwned.length} (${islandsOwned.join(', ')})\n` +
        `Hierro: ${totalIron} | Oro: ${totalGold} | Esmeralda: ${totalEmerald} | Carbón: ${totalCoal} | Piedra: ${totalStone}\n` +
        `Personas/esclavos: ${totalPeople}\n` +
        `Seguidores: ${clans[myClan].seguidores || 0}`
    )
}
handler.tags = ['isla']
handler.help = ['islasresumen']
handler.command = ['islasresumen']
handler.group = false
export default handler
