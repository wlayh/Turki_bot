const handler = async (m, {conn}) => {
  // Crear botones con los números proporcionados
  const buttons = [
    {buttonId: 'bot_personalizado', buttonText: {displayText: 'Comprar Bot Personalizado'}, type: 1},
    {buttonId: 'bot_grupo', buttonText: {displayText: 'Solicitar Bot para Grupo'}, type: 1}
  ];

  const buttonMessage = {
    text: `*╭━━━━━━━━━━━━━━━╮*
*┃  ✨ 『𝕬𝖘𝖙𝖆-𝕭𝖔𝖙』 ✨  ┃*
*╰━━━━━━━━━━━━━━━╯*

*🤖 ¡ADQUIERE TU BOT AHORA! 🤖*

*🚀 Potencia tu experiencia en WhatsApp*
*💯 Funciones exclusivas y personalizables*
*⚡ Respuesta inmediata y soporte premium*

👇 *Selecciona una opción para contactar directamente:* 👇`,
    footer: '© ✨ Asta-Bot | Calidad Premium ✨',
    buttons: buttons,
    headerType: 1
  };

  // Enviar mensaje con botones
  conn.sendMessage(m.chat, buttonMessage);

  // Manejador para las respuestas de los botones
  conn.ev.on('messages.upsert', async chatUpdate => {
    try {
      const mek = chatUpdate.messages[0];
      if (!mek.message) return;
      
      if (mek.message?.buttonsResponseMessage?.selectedButtonId === 'bot_personalizado') {
        conn.sendMessage(mek.key.remoteJid, {
          text: `*╭─────────────────────╮*
*│ 🌟 BOT PERSONALIZADO 🌟 │*
*╰─────────────────────╯*

*✅ ¡Excelente elección!* 

*📲 Contacta ahora mismo:*
*👉 wa.me/524181450063*

*✨ Beneficios:*
*🔹 Nombre personalizado*
*🔹 Logo a tu elección* 
*🔹 Funciones exclusivas*
*🔹 Soporte prioritario*`
        });
      }
      
      if (mek.message?.buttonsResponseMessage?.selectedButtonId === 'bot_grupo') {
        conn.sendMessage(mek.key.remoteJid, {
          text: `*╭────────────────────╮*
*│ 🤖 BOT PARA GRUPO 🤖 │*
*╰────────────────────╯*

*✅ ¡Gran decisión!* 

*📲 Contacta ahora mismo:*
*👉 wa.me/527461177130*

*✨ Ventajas:*
*🔹 Moderación automática*
*🔹 Juegos para grupos*
*🔹 Comandos divertidos*
*🔹 Protección anti-spam*`
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
};

handler.command = /^(ComprarBot|Comprar|comprar|ComprarBot)$/i;
export default handler;

// Variable global con información
global.ComprarBot = `
*╭━━━━━━━━━━━━━━━━━━━━╮*
*┃    ✨ 『𝕬𝖘𝖙𝖆-𝕭𝖔𝖙』 ✨    ┃*
*╰━━━━━━━━━━━━━━━━━━━━╯*

*🔥 OPCIONES DISPONIBLES 🔥*

*🤖 BOT PARA GRUPO:*
👉 wa.me/527461177130

*👑 BOT PERSONALIZADO:*
👉 wa.me/524181450063

*✅ PROMOCIÓN ESPECIAL ✅*
*¡ADQUIERE TU BOT HOY MISMO!*
*💯 CALIDAD GARANTIZADA 💯*
`;

