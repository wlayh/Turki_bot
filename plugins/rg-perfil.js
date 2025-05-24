import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;
    
    // Verificar estado de matrimonio desde la base de datos de matrimonios
    let marriageInfo = null;
    let partnerName = 'Nadie';
    let marriageDate = null;
    
    if (global.db.data.marriages) {
        marriageInfo = Object.values(global.db.data.marriages).find(marriage => 
            marriage.spouse1 === userId || marriage.spouse2 === userId
        );
        
        if (marriageInfo) {
            let partnerId = marriageInfo.spouse1 === userId ? marriageInfo.spouse2 : marriageInfo.spouse1;
            partnerName = conn.getName(partnerId);
            marriageDate = marriageInfo.marriageDate;
        }
    }
    
    // Obtener la fecha actual
    const now = moment();
    const registerDate = user.regTime ? moment(user.regTime) : now;
    const timeDiff = now.diff(registerDate, 'days');
    
    // Actividad reciente
    const lastSeen = user.lastSeen ? moment(user.lastSeen).fromNow() : 'Desconocido';

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    // Emojis según género
    let genderEmoji = '⚪';
    if (genero.toLowerCase().includes('hombre') || genero.toLowerCase().includes('masculino')) {
        genderEmoji = '♂️';
    } else if (genero.toLowerCase().includes('mujer') || genero.toLowerCase().includes('femenino')) {
        genderEmoji = '♀️';
    }
    
    // Estado premium con bling
    let premiumStatus = user.premium ? '✨ PREMIUM ✨' : '❌ FREE';
    
    // Emojis para rangos
    let roleEmoji = '👤';
    if (role.toLowerCase().includes('admin')) roleEmoji = '👑';
    else if (role.toLowerCase().includes('mod')) roleEmoji = '�shield️';
    else if (role.toLowerCase().includes('vip')) roleEmoji = '💎';

    // Estado civil mejorado
    let maritalStatus;
    if (marriageInfo) {
        maritalStatus = `💍 Casado/a con ${partnerName}`;
        if (marriageDate) {
            maritalStatus += `\n*┃* *💕 Fecha de matrimonio:* ${marriageDate}`;
        }
    } else {
        maritalStatus = '💔 Soltero/a';
    }

    let profileText = `
*╭━━━━❰ 🌟 PERFIL DE USUARIO 🌟 ❱━━━━╮*
*┃*
*┃* *👤 Usuario:* @${userId.split('@')[0]}
*┃* *🏷️ Nombre:* ${name}
*┃* *📝 Descripción:* 
*┃* ${description}
*┃*
*┃* *━━━━❰ ℹ️ INFORMACIÓN PERSONAL ℹ️ ❱━━━━*
*┃* 
*┃* *🎂 Edad:* ${user.age || 'Desconocida'}
*┃* *🎊 Cumpleaños:* ${cumpleanos}
*┃* *${genderEmoji} Género:* ${genero}
*┃* *💘 Estado Civil:* ${maritalStatus}
*┃* *⏱️ Registrado hace:* ${timeDiff} días
*┃* *⌚ Última actividad:* ${lastSeen}
*┃*
*┃* *━━━━❰ 🏆 ESTADÍSTICAS 🏆 ❱━━━━*
*┃*
*┃* *✨ Experiencia:* ${exp.toLocaleString()}
*┃* *🔥 Nivel:* ${nivel}
*┃* *${roleEmoji} Rango:* ${role}
*┃*
*┃* *━━━━❰ 💰 ECONOMÍA 💰 ❱━━━━*
*┃*
*┃* *👛 Cartera:* ${coins.toLocaleString()} ${moneda}
*┃* *🏦 Banco:* ${bankCoins.toLocaleString()} ${moneda}
*┃* *💼 Total:* ${(coins + bankCoins).toLocaleString()} ${moneda}
*┃*
*┃* *━━━━❰ 🌈 ESTADOS 🌈 ❱━━━━*
*┃*
*┃* *👑 Premium:* ${premiumStatus}
*┃* *🧩 Estado VIP:* ${user.vip ? '✅ Activado' : '❌ Desactivado'}
*┃* *🛡️ Reputación:* ${user.reputation || 0} ⭐
*┃*
*╰━━━━━━━━━━━━━━━━━━━━━━━╯*

*🔮 Usa el comando /editar para personalizar tu perfil* 
*💫 Gana más experiencia interactuando en el grupo*
${marriageInfo ? '' : '*💘 Usa /marry para encontrar el amor*'}
  `.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✧・✦・💫 Perfil de Usuario 💫・✦・✧',
                body: dev,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['profile', 'perfil'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
