import { ensureIslands } from './islas-utils.js'

let handler = async (m, { conn, text, usedPrefix }) => {
    let islands = ensureIslands()
    let id = text.trim()
    let isla = islands[id]
    if (!isla) return m.reply('Esa isla no existe.')
    m.reply(
        `Isla ${id}: ${isla.name}\n` +
        `Dueño: ${isla.owner || 'Sin dueño'}\n` +
        `Personas: ${isla.people || 0}\n` +
        `Hierro: ${isla.iron} | Oro: ${isla.gold} | Esmeralda: ${isla.emerald} | Carbón: ${isla.coal} | Piedra: ${isla.stone}\n` +
        `Mineros: ${isla.miners || 0} | Cazadores: ${isla.hunters || 0} | Pescadores: ${isla.fishers || 0}\n` +
        `Seguidores: ${isla.followers || 0}\n` +
        `Recursos extra: ${isla.resources && isla.resources.length > 0 ? isla.resources.join(', ') : 'Ninguno'}`
    )
}
handler.tags = ['isla']
handler.help = ['islasinfo <id_isla>']
handler.command = ['islasinfo']
handler.group = false
export default handler





