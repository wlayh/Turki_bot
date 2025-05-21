let handler = async (m, { conn, usedPrefix, command }) => {
    // Emojis para hacer la lista más llamativa
    const corazonEmoji = '💕';
    const anilloEmoji = '💍';
    const florEmoji = '🌹';
    const celebracionEmoji = '🎉';
    const coronaEmoji = '👑';
    const cupidoEmoji = '💘';
    const besosEmoji = '💋';
    const listaEmoji = '📋';
    const calendarioEmoji = '📅';
    const relojEmoji = '⏰';
    const estrellasEmoji = '✨';
    
    // Inicializar base de datos si no existe
    if (!global.db.data.marriages) {
        global.db.data.marriages = {};
    }
    if (!global.db.data.proposals) {
        global.db.data.proposals = {};
    }

    let marriages = Object.values(global.db.data.marriages);
    let proposals = Object.values(global.db.data.proposals);
    
    let mensaje = `${coronaEmoji} *¡REGISTRO DE AMOR!* ${coronaEmoji}\n\n`;
    
    // Mostrar parejas casadas
    if (marriages.length > 0) {
        mensaje += `${anilloEmoji} *PAREJAS CASADAS* ${anilloEmoji}\n`;
        mensaje += `${estrellasEmoji}━━━━━━━━━━━━━━━━━━━━━━━${estrellasEmoji}\n\n`;
        
        marriages.forEach((marriage, index) => {
            let spouse1Name = marriage.spouse1.split('@')[0];
            let spouse2Name = marriage.spouse2.split('@')[0];
            
            mensaje += `${corazonEmoji} *Pareja ${index + 1}:*\n`;
            mensaje += `${florEmoji} ${spouse1Name} ${besosEmoji} ${spouse2Name}\n`;
            mensaje += `${calendarioEmoji} Casados el: ${marriage.marriageDate}\n`;
            mensaje += `${relojEmoji} Hora: ${marriage.marriageTime}\n\n`;
        });
        
        mensaje += `${celebracionEmoji} *Total de parejas casadas: ${marriages.length}* ${celebracionEmoji}\n\n`;
    } else {
        mensaje += `${anilloEmoji} *PAREJAS CASADAS* ${anilloEmoji}\n`;
        mensaje += `${estrellasEmoji}━━━━━━━━━━━━━━━━━━━━━━━${estrellasEmoji}\n\n`;
        mensaje += `${cupidoEmoji} *¡Aún no hay parejas casadas!*\n\n`;
        mensaje += `${florEmoji} *Sé el primero en encontrar el amor verdadero* ${corazonEmoji}\n\n`;
    }
    
    // Mostrar propuestas pendientes
    if (proposals.length > 0) {
        mensaje += `${cupidoEmoji} *PROPUESTAS PENDIENTES* ${cupidoEmoji}\n`;
        mensaje += `${estrellasEmoji}━━━━━━━━━━━━━━━━━━━━━━━${estrellasEmoji}\n\n`;
        
        proposals.forEach((proposal, index) => {
            let proposerName = proposal.proposer.split('@')[0];
            let targetName = proposal.target.split('@')[0];
            
            mensaje += `${anilloEmoji} *Propuesta ${index + 1}:*\n`;
            mensaje += `${florEmoji} ${proposerName} ${cupidoEmoji} ${targetName}\n`;
            mensaje += `${calendarioEmoji} Propuesta: ${proposal.proposalDate}\n`;
            mensaje += `${relojEmoji} Hora: ${proposal.proposalTime}\n\n`;
        });
        
        mensaje += `${corazonEmoji} *Total de propuestas pendientes: ${proposals.length}* ${corazonEmoji}\n\n`;
    } else {
        mensaje += `${cupidoEmoji} *PROPUESTAS PENDIENTES* ${cupidoEmoji}\n`;
        mensaje += `${estrellasEmoji}━━━━━━━━━━━━━━━━━━━━━━━${estrellasEmoji}\n\n`;
        mensaje += `${florEmoji} *¡No hay propuestas pendientes!* ${anilloEmoji}\n\n`;
    }
    
    // Estadísticas adicionales
    mensaje += `${listaEmoji} *ESTADÍSTICAS DEL AMOR* ${listaEmoji}\n`;
    mensaje += `${estrellasEmoji}━━━━━━━━━━━━━━━━━━━━━━━${estrellasEmoji}\n\n`;
    mensaje += `${celebracionEmoji} Matrimonios realizados: **${marriages.length}**\n`;
    mensaje += `${cupidoEmoji} Propuestas en espera: **${proposals.length}**\n`;
    mensaje += `${corazonEmoji} Total de corazones involucrados: **${(marriages.length * 2) + (proposals.length * 2)}**\n\n`;
    
    mensaje += `${coronaEmoji} *¿Serás el próximo en encontrar el amor?* ${coronaEmoji}\n`;
    mensaje += `${florEmoji} Usa *${usedPrefix}marry @usuario* para proponer matrimonio ${besosEmoji}`;

    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['nv', 'casados', 'parejas'];
handler.tags = ['fun', 'social'];
handler.command = ['nv', 'casados', 'parejas', 'marriages', 'couples'];
handler.group = true;
handler.register = true;

export default handler;

