//Código para identificar bot no oficial

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    try {
        // Información del creador y bot oficial
        const creatorNumber = '+524181450063';
        const officialBotNumber = '+527461177130';
        
        // Reacción para indicar que es un comando del bot no oficial
        m.react('❌');

        // Construir el mensaje de aclaración
        let str = `*⚠️ ATENCIÓN: BOT NO OFICIAL ⚠️*\n\n`;
        str += `Este bot *NO ES EL BOT OFICIAL* del servicio.\n\n`;
        str += `*📱 El Bot Oficial es:* wa.me/${officialBotNumber.replace('+', '')}\n`;
        str += `*👨‍💻 Creador Original:* wa.me/${creatorNumber.replace('+', '')}\n\n`;
        str += `*❗ IMPORTANTE ❗*\n`;
        str += `Este es un bot alternativo/no oficial creado con la base del bot original.\n`;
        str += `Para el servicio oficial y completo, contacta al bot oficial.`;

        // Enviar mensaje principal
        await conn.sendMessage(m.chat, { 
            text: str,
            mentions: [m.sender]
        });

        // Enviar segundo mensaje con más información
        setTimeout(async () => {
            try {
                // URL de una imagen que muestre la diferencia entre oficial y no oficial (reemplazar)
                const fakeNotice = 'https://i.imgur.com/example-fake.png';
                
                await conn.sendMessage(m.chat, {
                    image: { url: fakeNotice },
                    caption: `*🚫 BOT NO OFICIAL / ALTERNATIVO 🚫*\n\nEste bot es una versión alternativa. El bot oficial es: ${officialBotNumber}`,
                    mentions: [m.sender]
                });
            } catch (error) {
                console.error('Error al enviar imagen:', error);
                // Si falla enviar la imagen, mensaje de texto como respaldo
                await conn.sendMessage(m.chat, {
                    text: `*🚫 BOT NO OFICIAL / ALTERNATIVO 🚫*\n\nEste bot es una versión alternativa. El bot oficial es: ${officialBotNumber}`,
                    mentions: [m.sender]
                });
            }
        }, 1000);

        // Enviar mensaje final con aclaración adicional
        setTimeout(async () => {
            try {
                await conn.sendMessage(m.chat, {
                    text: `*📢 ACLARACIÓN 📢*\n\nEste bot fue creado con permiso del creador original (${creatorNumber}) pero no es el bot oficial.\n\nEl único bot oficial es: ${officialBotNumber}\n\nGracias por tu comprensión.`,
                    mentions: [m.sender]
                });
            } catch (error) {
                console.error('Error al enviar mensaje final:', error);
            }
        }, 2000);
        
    } catch (error) {
        console.error('Error en el comando fake:', error);
        // Intentar enviar al menos un mensaje básico en caso de error
        await conn.sendMessage(m.chat, {
            text: `*🚫 BOT NO OFICIAL 🚫*\n\nEste NO es el bot oficial. El bot oficial es: ${officialBotNumber}`
        });
    }
}

handler.help = ['verificar', 'oficial', 'botoficial'];
handler.tags = ['info'];
handler.command = ['verificar', 'oficial', 'botoficial', 'verificación'];

export default handler;

