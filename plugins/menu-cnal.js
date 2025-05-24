let handler = async (m, { conn, usedPrefix }) => {
    const menu = `
🏰 *Menú de Clanes, Islas y Batallas*

*🎮 Comandos de Clanes*
${usedPrefix}clancrear <nombre>
Crea un nuevo clan y te convierte en su admin.

${usedPrefix}clanunirse <nombre>
Únete a un clan existente.

${usedPrefix}clanmi
Muestra información sobre tu clan actual.

${usedPrefix}clanlistar
Lista todos los clanes existentes.

${usedPrefix}clanexpulsar <id_usuario>
[Admin] Expulsa a un miembro del clan.

*🏝️ Comandos de Islas*
${usedPrefix}islacrear <nombre> | <personas> | <hierro> | <oro> | <esmeralda> | <carbón> | <piedra> | <recursos extra (opcional)>
[Owner] Crea una isla personalizada con minerales individuales.

${usedPrefix}islacomprar
Compra automáticamente la primera isla libre para tu clan.

${usedPrefix}islavender <id_isla> <precio>
[Admin] Pone a la venta una isla de tu clan.

${usedPrefix}islacomprarventa <id_isla>
Compra una isla puesta en venta.

${usedPrefix}islaextraer <id_isla>
Extrae minerales individuales (hierro, oro, esmeralda, carbón, piedra) de una isla de tu clan.

${usedPrefix}islamias
Muestra todas las islas que tiene tu clan.

${usedPrefix}islaslista
Muestra todas las islas y su estado, incluyendo sus minerales.

${usedPrefix}islasresumen
Muestra resumen de todas tus islas (minerales, personas, seguidores).

${usedPrefix}islasinfo <id_isla>
Muestra información detallada de una isla (minerales individuales, recursos, trabajadores, etc).

${usedPrefix}islasasignar <id_isla> <actividad> <cantidad>
Asigna personas de tu isla a minar/cazar/pescar.
Ejemplo: ${usedPrefix}islasasignar 5 minar 2

*⚔️ Comandos de Batallas*
${usedPrefix}batallaretar <id_isla>
Reta al clan dueño de una isla para intentar conquistarla.

${usedPrefix}batallarecompensa
Reclama recompensa de actividad para tu clan.

*🦌 Economía de Caza*
${usedPrefix}vendercaza
Abre el menú de venta de animales/trofeos.

${usedPrefix}vendercaza todo
Vende todos los animales y trofeos.

${usedPrefix}vendercaza animales
Vende solo los animales de tu inventario.

${usedPrefix}vendercaza trofeos
Vende solo los trofeos de tu inventario.

${usedPrefix}vendercaza <nombre>
Vende un animal o trofeo específico.

${usedPrefix}vendercaza precios
Muestra la tabla de precios de venta de animales/trofeos.

${usedPrefix}valorarcaza
Muestra el valor total de tus animales, trofeos y monedas.

---

_Los recursos de minerales ahora son: hierro, oro, esmeralda, carbón y piedra._
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
