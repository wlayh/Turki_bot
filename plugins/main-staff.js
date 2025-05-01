import { createHash } from 'crypto';

let handler = async (m, { conn, usedPrefix, command }) => {
    // Obtener datos necesarios del contexto global
    const botname = global.botname || '『𝕬𝖘𝖙𝖆-𝕭𝖔𝖙』';
    const vs = global.vs || 'v2.5.1';
    const libreria = global.libreria || 'Baileys';
    const baileys = global.baileys || 'Multi-Device';
    const creador = global.creador || '@fernando_';
    
    // Mensaje principal
    let mensaje = `*╭━━━━❰ 👑 EQUIPO DEL BOT 👑 ❱━━━━╮*
*┃*
*┃* ᥫ᭡ *EQUIPO DE AYUDANTES* ❀
*┃* ✰ *Dueño:* ${creador}
*┃* ✦ *Bot:* ${botname}
*┃* ⚘ *Versión:* ${vs}
*┃* ❖ *Libreria:* ${libreria} ${baileys}
*┃*
*┃* *━━━━❰ 👨‍💻 DESARROLLADORES 👨‍💻 ❱━━━━*
*┃*
*┃* *❍ Creador:*
*┃* ᰔᩚ 𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔
*┃* > 🜸 Rol » *Creador*
*┃* > ✧ GitHub » https://github.com/Fer280809
*┃*
*┃* ᰔᩚ ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜
*┃* > 🜸 Rol » *Creador*
*┃* > ✧ GitHub » https://github.com/The-King-Destroy
*┃*
*┃* *❒ Colaboradores:*
*┃* ᰔᩚ 𝓔𝓶𝓶𝓪 𝓥𝓲𝓸𝓵𝓮𝓽𝓼 𝓥𝓮𝓻𝓼𝓲ó𝓷 
*┃* > 🜸 Rol » *Developer*
*┃* > ✧ GitHub » https://github.com/Elpapiema
*┃*
*┃* ᰔᩚ Niño Piña
*┃* > 🜸 Rol » *Developer*
*┃* > ✧ GitHub » https://github.com/WillZek
*┃*
*┃* ✧ ☆꧁༒ĹєǤ𝒆𝐧𝐃༒꧂☆
*┃* > 🜸 Rol » *Developer*
*┃* > ✧ GitHub » https://github.com/Diomar-s
*┃*
*┃* ᰔᩚ I'm Fz' (Tesis)
*┃* > 🜸 Rol » *Developer*
*┃* > ✧ GitHub » https://github.com/FzTeis
*┃*
*┃* ᰔᩚ Legna
*┃* > 🜸 Rol » *Mini-Dev* 
*┃* > ✧ GitHub » https://github.com/Legna-chan
*┃*
*┃* *📢 ¿Quieres tu propio bot personalizado?*
*┃* *🤖 Presiona el botón de abajo*
*┃*
*╰━━━━━━━━━━━━━━━━━━━━━━━╯*`;

    // Número del creador para el botón
    const numeroCreador = '524181450063';
    
    // Crear botón para solicitar bot
    const templateButtons = [
        {
            index: 1,
            urlButton: {
                displayText: '🤖 SOLICITAR BOT 🤖',
                url: `https://wa.me/${numeroCreador}?text=Hola%20%F0%9F%91%8B%2C%20vi%20tu%20bot%20y%20me%20gustar%C3%ADa%20tener%20uno%20similar.%20%C2%BFMe%20puedes%20dar%20m%C3%A1s%20informaci%C3%B3n%3F`
            }
        }
    ];
    
    // Enviar mensaje con botón
    await conn.sendMessage(m.chat, {
        text: mensaje,
        footer: `${botname} • Powered by ${creador}`,
        templateButtons: templateButtons,
        headerType: 1
    }, { quoted: m });
    
    // Alternativa si no funcionan los botones en algunas versiones de WhatsApp
    setTimeout(async () => {
        await conn.sendMessage(m.chat, {
            text: `*🔔 Si el botón no funciona, puedes escribir directamente al creador:*\nwa.me/${numeroCreador}`
        }, { quoted: m });
    }, 1000);
};

handler.help = ['equipo', 'creadores', 'developers'];
handler.tags = ['main', 'info'];
handler.command = ['equipo', 'creadores', 'developers', 'creador', 'dev'];

export default handler;

