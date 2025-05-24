let handler = async (m, { conn }) => {
    let islands = global.db.data.islands || {}
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!myClan) return m.reply('Debes estar en un clan.')
    let totalMinerals = 0, totalPeople = 0, islandsOwned = []
    for (const [id, isla] of Object.entries(islands)) {
        if (isla.owner === myClan) {
            totalMinerals += (isla.minerals || 0)
            totalPeople += (isla.people || 0)
            islandsOwned.push(id)
        }
    }
    m.reply(
        `Clan: ${myClan}\n` +
        `Islas: ${islandsOwned.length} (${islandsOwned.join(', ')})\n` +
        `Minerales: ${totalMinerals}\n` +
        `Personas/esclavos: ${totalPeople}\n` +
        `Seguidores: ${clans[myClan].seguidores || 0}`
    )
}
handler.tags = ['isla']
handler.help = ['islasresumen']
handler.command = ['islasresumen']
handler.group = false
export default handler