import { ensureIslands } from './islas-utils.js'

let handler = async (m, { conn }) => {
    let islands = ensureIslands()
    let clans = global.db.data.clans || {}
    let senderId = m.sender
    let myClan = Object.keys(clans).find(c => clans[c].members.includes(senderId))
    if (!myClan) return m.reply('Debes pertenecer a un clan.')

    // Buscar la primera isla libre
    let libre = Object.keys(islands).find(id => !islands[id].owner)
    if (!libre) return m.reply('No hay islas libres disponibles.')
    islands[libre].owner = myClan
    global.db.data.islands = islands
    m.reply(`¡La isla ${libre} ahora pertenece al clan ${myClan}!`)
}
handler.tags = ['isla']
handler.help = ['islacomprar']
handler.command = ['islacomprar']
handler.group = false
export default handler
