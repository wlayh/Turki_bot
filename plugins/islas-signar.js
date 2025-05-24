let handler = async (m, { conn, text, usedPrefix }) => {
    let islands = global.db.data.islands || {}
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let [id, actividad, cantidad] = text.trim().split(/ +/)
    cantidad = parseInt(cantidad)
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!myClan) return m.reply('Debes estar en un clan.')
    let isla = islands[id]
    if (!isla) return m.reply('Isla no encontrada.')
    if (isla.owner !== myClan) return m.reply('Esa isla no es de tu clan.')
    if ((isla.people || 0) < cantidad) return m.reply('No tienes suficientes personas.')
    if (!['minar', 'cazar', 'pescar'].includes(actividad)) return m.reply('Actividad inválida.')

    isla.people -= cantidad
    if (actividad === 'minar') isla.miners = (isla.miners || 0) + cantidad
    if (actividad === 'cazar') isla.hunters = (isla.hunters || 0) + cantidad
    if (actividad === 'pescar') isla.fishers = (isla.fishers || 0) + cantidad

    global.db.data.islands = islands
    m.reply(`Has asignado ${cantidad} personas a ${actividad} en isla ${id}.`)
}
handler.tags = ['isla']
handler.help = ['islasasignar <id_isla> <actividad> <cantidad>']
handler.command = ['islasasignar']
handler.group = false
export default handler