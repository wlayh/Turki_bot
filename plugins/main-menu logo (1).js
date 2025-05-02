import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[userId];
    let name = conn.getName(userId);
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
    
    let txt = `
    ✦...*¡BIENVENIDO!*...✦
    ✦ @${userId.split('@')[0]} ✦

> ✰ ¡Hola! Me llamo ✰
*${botname}*  

╭━━━━━━━━━━━━━━━━━
│ ⚡️ *INFORMACIÓN BOT* ⚡️
│ 
│ 👾 *Modo:* ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Sub Bot🅑')}
│ ⏱️ *Tiempo activo:* ${uptime}
│ 👥 *Usuarios:* ${totalreg}
│ 🛠️ *Comandos:* ${totalCommands}
│ 🔒 *Estado:* Privado
╰━━━━━━━━━━━━━━━━━

📌 *Únete al grupo oficial del bot*
📱 *Crea tu propio Sub-Bot con #qr o #code*

╭━━━━━━━━━━━━━━━━━
│ 🎨 *EFECTOS DE TEXTO* 🎨
│
│ 🌟 *Efectos simples:*
│ ᰔᩚ !slice [texto] ➟ Texto rebanado con brillo
│ ᰔᩚ !glow [texto] ➟ Texto con brillo avanzado
│ ᰔᩚ !glittch [texto] ➟ Efecto glitch impresionante
│ ᰔᩚ !deepsea [texto] ➟ Texto metálico 3D mar profundo
│ ᰔᩚ !horror [texto] ➟ Texto sangriento de horror
│ ᰔᩚ !whitebear [texto] ➟ Logo de oso blanco y negro
│ ᰔᩚ !joker [texto] ➟ Logo estilo Joker
│ ᰔᩚ !metallic [texto] ➟ Efecto de texto metálico
│ ᰔᩚ !steel [texto] ➟ Efecto de texto de acero
│ ᰔᩚ !harrypotter [texto] ➟ Estilo Harry Potter
│ ᰔᩚ !underwater [texto] ➟ Texto submarino 3D
│ ᰔᩚ !luxury [texto] ➟ Texto de oro de lujo 3D
│ ᰔᩚ !glue [texto] ➟ Texto 3D con pegamento realista
│ ᰔᩚ !fabric [texto] ➟ Efecto de texto de tela
│ ᰔᩚ !toxic [texto] ➟ Efecto de texto tóxico
│ ᰔᩚ !ancient [texto] ➟ Texto antiguo dorado 3D
│ ᰔᩚ !cloud [texto] ➟ Texto de nube en el cielo
│ ᰔᩚ !transformer [texto] ➟ Estilo Transformer
│ ᰔᩚ !thunder [texto] ➟ Texto con truenos
│ ᰔᩚ !scifi [texto] ➟ Texto de ciencia ficción 3D
│ ᰔᩚ !sand [texto] ➟ Texto en arena de playa
│ ᰔᩚ !rainbow [texto] ➟ Texto caligráfico arcoíris 3D
│ ᰔᩚ !pencil [texto] ➟ Efecto de texto tipo boceto
│ ᰔᩚ !neon2 [texto] ➟ Texto con luz neón 3D
│ ᰔᩚ !magma [texto] ➟ Texto magma caliente
│ ᰔᩚ !leaves [texto] ➟ Texto con hojas naturales
│ ᰔᩚ !glitch [texto] ➟ Efectos glitch impresionantes
│ ᰔᩚ !discovery [texto] ➟ Efectos de texto espacial
│ ᰔᩚ !christmas [texto] ➟ Texto con árbol de Navidad
│ ᰔᩚ !candy [texto] ➟ Texto bastón de caramelo navideño
│ ᰔᩚ !1917 [texto] ➟ Efecto de texto estilo 1917
│ ᰔᩚ !blackpink [texto] ➟ Estilo logo Blackpink
│ ᰔᩚ !neon [texto] ➟ Texto estilo luz neón
│ ᰔᩚ !summer [texto] ➟ Texto neón de verano
│ ᰔᩚ !pixel [texto] ➟ Texto pixelado 3D
│ ᰔᩚ !2024 [texto] ➟ Tarjeta Año Nuevo 2024 3D
│ ᰔᩚ !newyear [texto] ➟ Tarjetas de Año Nuevo 3D
│ ᰔᩚ !party [texto] ➟ Texto tema eventos nocturnos
│ ᰔᩚ !valentine [texto] ➟ Texto dorado sobre destellos rojos
│ ᰔᩚ !frozen [texto] ➟ Texto 3D de invierno congelado
│ ᰔᩚ !glass [texto] ➟ Efecto de texto cromado 3D
│ ᰔᩚ !deluxe [texto] ➟ Texto plateado de lujo
│ ᰔᩚ !black [texto] ➟ Texto 3D negro brillante
│ 
│ 🎭 *Efectos con dos textos:*
│ ᰔᩚ !stel [texto1;texto2] ➟ Texto de acero 3D
│ ᰔᩚ !avenger [texto1;texto2] ➟ Logo 3D de Avengers
│ ᰔᩚ !marvel [texto1;texto2] ➟ Logo Marvel Studios
│ ᰔᩚ !phub [texto1;texto2] ➟ Logo estilo Pornhub
│ ᰔᩚ !glitch3 [texto1;texto2] ➟ Glitch estilo TikTok
│ ᰔᩚ !glitch2 [texto1;texto2] ➟ Efecto glitch online
│ ᰔᩚ !grafiti [texto1;texto2] ➟ Texto graffiti en pared
│ ᰔᩚ !golden [texto1;texto2] ➟ Logo 3D metal dorado
│ ᰔᩚ !captain [texto1;texto2] ➟ Texto Capitán América
╰━━━━━━━━━━━━━━━━━


💫 ¡Disfruta del bot y sus funciones! 💫
  `.trim();

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: banner,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m });

};

handler.help = ['menu+'];
handler.tags = ['main'];
handler.command = ['menulogo', 'menul', 'helpl', 'helplogo'];

export default handler;

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
