import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, `❌ *¡USUARIO NO ENCONTRADO!* ❌\n\n🔍 El usuario no se encuentra en mi base de datos.`, m);
    }
    
    let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557972839.jpeg';
    let user = global.db.data.users[who];
    let name = conn.getName(who);

    // Estado premium con emojis más llamativos
    let premium = user.premium ? '✅ *ACTIVADO*' : '❌ *DESACTIVADO*';
    
    // Calcular nivel básico basado en experiencia
    let level = Math.floor(Math.log(user.exp || 0 + 1) / Math.log(4));
    if (level < 0) level = 0;
    
    // Calcular salud en formato de barra
    let healthPercentage = (user.health || 100) / 100;
    let healthBar = '';
    for (let i = 0; i < 10; i++) {
        healthBar += i < Math.floor(healthPercentage * 10) ? '❤️' : '🖤';
    }
    
    // Fecha formateada más bonita
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Tiempo restante para próxima aventura
    let adventureCooldown = 3600000; // 1 hora en milisegundos
    let timeLeft = user.lastAdventure ? adventureCooldown - (Date.now() - user.lastAdventure) : 0;
    let adventureStatus = '';
    
    if (timeLeft <= 0) {
        adventureStatus = '✅ *¡LISTO PARA AVENTURA!*';
    } else {
        let minutes = Math.floor(timeLeft / 60000);
        let seconds = Math.floor((timeLeft % 60000) / 1000);
        adventureStatus = `⏳ *Espera:* ${minutes}m ${seconds}s`;
    }

    let text = `
╔═══════════════════════╗
║ 🎒 *INVENTARIO DE AVENTURERO* 🎒
╠═══════════════════════╝
║ 👤 *Aventurero:* ${name}
║ 🌟 *Nivel estimado:* ${level}
║ ✨ *Experiencia:* ${user.exp || 0} EXP
╠═══════════════════════
║ 💰 *ECONOMÍA* 💰
╠═══════════════════════
║ 💸 *Monedas en Cartera:* ${user.coin || 0}
║ 🏦 *Monedas en Banco:* ${user.bank || 0}
║ 🎟️ *Tokens:* ${user.joincount || 0}
╠═══════════════════════
║ 💎 *RECURSOS* 💎
╠═══════════════════════
║ 💎 *Diamantes:* ${user.diamond || 0}
║ ♦️ *Esmeraldas:* ${user.emerald || 0}
║ 🏅 *Oro:* ${user.gold || 0}
║ 🔩 *Hierro:* ${user.iron || 0}
║ 🕋 *Carbón:* ${user.coal || 0}
║ 🪨 *Piedra:* ${user.stone || 0}
╠═══════════════════════
║ 🎁 *COLECCIONABLES* 🎁
╠═══════════════════════
║ 🍬 *Dulces:* ${user.candies || 0}
║ 🎁 *Regalos:* ${user.gifts || 0}
╠═══════════════════════
║ ❤️ *ESTADO* ❤️
╠═══════════════════════
║ ${healthBar} (${user.health || 100}/100)
║ 👑 *Premium:* ${premium}
║ 🔮 *Aventura:* ${adventureStatus}
╠═══════════════════════
║ 📅 *${formattedDate}*
╚═══════════════════════

📊 *Comandos disponibles:*
🔹 *${usedPrefix}aventura* - Buscar recursos
🔹 *${usedPrefix}curar* - Restaurar salud
🔹 *${usedPrefix}minar* - Obtener minerales
🔹 *${usedPrefix}shop* - Ver tienda`;

    await conn.sendFile(m.chat, img, 'Inventario.jpg', text, fkontak);
}

handler.help = ['inv', 'inventario', 'mochila'];
handler.tags = ['rpg'];
handler.command = ['inv', 'inventario', 'mochila']; 
handler.group = true;
handler.register = true;

export default handler;
