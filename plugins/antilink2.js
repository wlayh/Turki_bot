export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup) return;
    
    // Acceder a la base de datos del chat
    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    let bot = global.db.data.settings[this.user.jid] || {};
    
    // No hacer nada si el mensaje es del bot
    if (m.fromMe) return true;
    
    // Patrones para detectar enlaces
    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi;
    const whatsappLinkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/gi;
    
    // Obtener el texto del mensaje
    const messageText = m.text || m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    
    // Verificar si contiene enlaces
    const containsLink = linkRegex.test(messageText) || whatsappLinkRegex.test(messageText);
    
    if (containsLink && chat.antiLink) {
        // Solo actuar si no es admin y el bot es admin
        if (!isAdmin && isBotAdmin) {
            // Borrar el mensaje
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
            
            // Enviar mensaje de advertencia
            await conn.sendMessage(m.chat, { 
                text: `*╭━━━━━━━━━━━━━━━╮*
*┃    🚫 ALERTA DE LINK 🚫    ┃*
*╰━━━━━━━━━━━━━━━╯*

*@${m.sender.split('@')[0]}* ha compartido un enlace ⚠️

*📌 Acción:* Mensaje eliminado
*⚠️ Advertencia:* Has obtenido una advertencia por infringir las reglas del grupo.

*ℹ️ Recuerda:* No está permitido compartir links en este grupo.`,
                mentions: [m.sender]
            });
            
            // Enviar comando de warn (como si fuera un comando enviado por un admin)
            await conn.sendMessage(m.chat, { 
                text: `#warn @${m.sender.split('@')[0]} rompiste la regla de mandar link en este grupo`,
                mentions: [m.sender]
            });
        }
    }
    
    return true;
}