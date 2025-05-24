let handler = async (m, { conn, usedPrefix }) => {
    const menu = `
🏰 *Menú de Clanes, Islas y Batallas*

*🎮 Comandos de Clanes*
${usedPrefix}clancrear <nombre>
${usedPrefix}clanunirse <nombre>
${usedPrefix}clanmi
${usedPrefix}clanlistar
${usedPrefix}clanexpulsar <id_usuario>

*🏝️ Comandos de Islas*
${usedPrefix}islacomprar <id_isla>
${usedPrefix}islavender <id_isla> <precio>
${usedPrefix}islacomprarventa <id_isla>
${usedPrefix}islaatacar <id_isla>
${usedPrefix}islamias

*⚔️ Comandos de Batallas*
${usedPrefix}batallaretar <id_isla>
${usedPrefix}batallarecompensa

*⛏️ Gestión de Islas y Personas*
${usedPrefix}islasresumen
${usedPrefix}islasinfo <id_isla>
${usedPrefix}islasasignar <id_isla> <actividad> <cantidad>
Ejemplo: ${usedPrefix}islasasignar 5 minar 2

_Para usar la mayoría de los comandos debes pertenecer a un clan._
_Solo el admin puede expulsar miembros o vender islas._
    `
    m.reply(menu)
}
handler.tags = ['clan', 'menu']
handler.help = ['menuclanes']
handler.command = ['menuclanes', 'clanmenu', 'menubatalla']
handler.group = false
export default handler