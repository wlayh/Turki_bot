/**
 * Comando para crear logos con múltiples estilos
 * Versión mejorada con 80 estilos diferentes y mensajes atractivos
 */

import fetch from 'node-fetch';

export default async function handler(m, { conn, text, args, usedPrefix, command }) {
    // Definir todos los estilos disponibles
    const styles = {
        // Estilos originales
        'callejero': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=graffiti-logo&text=',
        'moderno': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=alien-glow-anim-logo&text=',
        'naruto': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=naruto-logo&text=',
        'corazon': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=heart-logo&text=',
        'foto': 'https://api.lolhuman.xyz/api/ephoto1/glittergold?apikey=GataDios&text=',

        // Estilos adicionales (primera expansión)
        'neon': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=neon-logo&text=',
        'fuego': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=fire-logo&text=',
        'agua': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=water-logo&text=',
        'metal': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=chrome-logo&text=',
        'gaming': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=inner-fire-logo&text=',
        'hielo': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=ice-logo&text=',
        'retro': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=retro-logo&text=',
        'pixel': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=8bit-logo&text=',
        'zombie': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=zombie-logo&text=',
        'sangre': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=blood-logo&text=',
        'matrix': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=matrix-logo&text=',
        'purpura': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=purple-logo&text=',
        'rainbow': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=rainbow-logo&text=',
        'toxic': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=toxic-logo&text=',
        'rock': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=rock-logo&text=',
        'sunset': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=sunset-logo&text=',
        'vintage': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=vintage-logo&text=',
        'party': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=dance-logo&text=',
        'military': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=army-logo&text=',
        'gold': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=gold-accessory-logo&text=',
        'plateado': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=silver-logo&text=',
        'diamante': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=diamond-plate-logo&text=',
        'comic': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=comics-logo&text=',
        'luxury': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=luxury-logo&text=',
        'space': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=outer-space-logo&text=',

        // 50 nuevos estilos adicionales
        'alien': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=alien-glow-logo&text=',
        'animado': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=animated-logo&text=',
        'anime': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=anime-logo&text=',
        'arcoiris': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=rainbow2-logo&text=',
        'arquitectura': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=architecture-logo&text=',
        'art-deco': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=art-deco-logo&text=',
        'azul': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=blue-shadow-logo&text=',
        'brillo': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=sparkle-logo&text=',
        'brush': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=brush-logo&text=',
        'candy': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=candy-logo&text=',
        'carbon': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=carbon-fiber-logo&text=',
        'circuit': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=circuits-logo&text=',
        'cristal': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=crystal-logo&text=',
        'distorsion': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=distressed-logo&text=',
        'electrico': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=electric-logo&text=',
        'elegante': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=elegant-logo&text=',
        'fantasma': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=ghost-logo&text=',
        'floral': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=floral-logo&text=',
        'fluorescente': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=fluffy-logo&text=',
        'galaxia': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=galaxy-logo&text=',
        'games': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=arcade-3d-logo&text=',
        'gotico': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=gothic-logo&text=',
        'grafitti3d': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=3d-graffiti-logo&text=',
        'halloween': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=halloween-logo&text=',
        'hamburguesa': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=hamburger-logo&text=',
        'harry': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=harry-potter-logo&text=',
        'horror': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=horror-logo&text=',
        'hot': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=hot-logo&text=',
        'jungle': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=jungle-logo&text=',
        'laser': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=laser-logo&text=',
        'leon': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=lion-logo&text=',
        'luminoso': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=light-logo&text=',
        'luna': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=moon-logo&text=',
        'madera': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=wood-logo&text=',
        'magico': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=magic-logo&text=',
        'marvel': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=hero-logo&text=',
        'medieval': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=medieval-logo&text=',
        'milk': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=milk-logo&text=',
        'naturaleza': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=nature-logo&text=',
        'navidad': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=christmas-logo&text=',
        'necronomicon': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=necronomicon-logo&text=',
        'nieve': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=snow-logo&text=',
        'papel': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=paper-logo&text=',
        'pergamino': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=parchment-logo&text=',
        'piedra': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=stone-logo&text=',
        'prisma': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=crystal-logo&text=',
        'relajado': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=smooth-logo&text=',
        'rosa': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=pink-logo&text=',
        'stars': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=stars-logo&text=',
        'tecnologia': 'https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=tech-logo&text='
    };

    // Descripciones de los estilos para mensaje de ayuda mejorado
    const styleDescriptions = {
        'callejero': 'Estilo urbano de graffiti',
        'moderno': 'Futurista con brillo alienígena',
        'naruto': 'Inspirado en el anime Naruto',
        'corazon': 'Romántico con corazones',
        'foto': 'Efecto fotográfico con brillo dorado',
        'neon': 'Luces de neón brillantes',
        'fuego': 'Letras en llamas',
        'agua': 'Efecto acuático fluido',
        'metal': 'Acabado metálico cromado',
        'gaming': 'Perfecto para gamers',
        'hielo': 'Congelado con escarcha',
        'retro': 'Estilo vintage de los 80s',
        'pixel': 'Pixelado estilo 8-bits',
        'zombie': 'Tenebroso estilo zombie',
        'sangre': 'Letras sangrientas',
        'matrix': 'Código digital estilo Matrix',
        'purpura': 'Elegante tono púrpura',
        'rainbow': 'Colorido arcoíris vibrante',
        'toxic': 'Efecto tóxico radiactivo',
        'rock': 'Estilo rockero rebelde',
        'harry': 'Mágico estilo Harry Potter'
    };

    // Función para crear categorías de estilos
    const styleCategories = {
        '🔥 POPULARES': ['neon', 'fuego', 'metal', 'gaming', 'rainbow'],
        '✨ FANTASÍA': ['harry', 'magico', 'galaxia', 'space', 'cristal', 'naruto'],
        '🎮 GAMING': ['gaming', 'pixel', 'matrix', 'games', 'marvel'],
        '🎨 ARTÍSTICOS': ['callejero', 'grafitti3d', 'brush', 'comic', 'vintage'],
        '🌟 ELEGANTES': ['luxury', 'elegante', 'gold', 'plateado', 'diamante'],
        '🌈 COLORIDOS': ['rainbow', 'arcoiris', 'candy', 'brillo', 'purpura'],
        '🎭 TEMÁTICOS': ['halloween', 'navidad', 'horror', 'zombie', 'medieval'],
        '🌊 ELEMENTOS': ['agua', 'fuego', 'hielo', 'nieve', 'naturaleza']
    };

    // Función para crear un mensaje de ayuda con todos los estilos en formato visual atractivo
    const createHelpMessage = () => {
        let message = `*┏━━━━━━━━━━━━━━━━┓*
  *┃ 🎨 GENERADOR DE LOGOS 🎨 ┃*
  *┗━━━━━━━━━━━━━━━━┛*
  
  *Uso:* ${usedPrefix}${command} <estilo> <texto>
  
  `;

        // Mostrar categorías y estilos destacados
        for (const [category, styleList] of Object.entries(styleCategories)) {
            message += `*${category}*\n`;
            for (const style of styleList) {
                const desc = styleDescriptions[style] || 'Estilo único';
                message += `• *${style}*: ${desc}\n`;
            }
            message += '\n';
        }

        // Mostrar todos los estilos disponibles
        message += `*┏━━━ TODOS LOS ESTILOS (${Object.keys(styles).length}) ━━━┓*\n`;

        // Crear lista de estilos ordenada alfabéticamente
        const stylesList = Object.keys(styles).sort();

        // Mostrar los estilos en grupos de 4
        for (let i = 0; i < stylesList.length; i += 4) {
            const chunk = stylesList.slice(i, i + 4);
            message += `*${i + 1}.* ${chunk.join(' *|* ')}`;
            message += '\n';
        }

        message += `*┗━━━━━━━━━━━━━━━━━━━━━━━━━┛*\n`;
        message += `\n*✅ Ejemplo:* ${usedPrefix}${command} neon MiBot`;

        return message;
    };

    // Si no hay texto, mostrar la lista de estilos disponibles en formato visual
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: createHelpMessage(),
            contextInfo: {
                externalAdReply: {
                    title: "🎨 Generador de Logos",
                    body: "Crea logos impresionantes con 80 estilos diferentes",
                    thumbnailUrl: "https://i.ibb.co/ypkgK0X/logoprev.jpg",
                    sourceUrl: "https://flamingtext.com/",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    }

    // Separar el estilo del texto
    const [style, ...inputText] = args;
    const logoText = inputText.join(' ');

    // Verificar si el estilo es válido
    if (!styles[style]) {
        return conn.reply(m.chat, `${emoji2} Estilo no válido. Usa ${usedPrefix}${command} para ver la lista de estilos disponibles.`, m);
    }

    // Obtener la URL base para el estilo seleccionado
    const baseUrl = styles[style];
    const fallbackUrl = fallbackStyles[style];

    // Construir la URL final
    const finalUrl = baseUrl + encodeURIComponent(logoText);
    const finalFallbackUrl = fallbackUrl + encodeURIComponent(logoText);

    try {
        await m.react('🕒');
        // Intentar obtener la imagen del primer enlace
        const response = await fetch(finalUrl);
        if (!response.ok) throw new Error('Error al obtener la imagen.');
        const imageBuffer = await response.buffer();
        await conn.sendMessage(m.chat, { image: imageBuffer, caption: `*Logo con estilo ${style}*` }, { quoted: m });
        await m.react('✅');
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        try {
            // Intentar obtener la imagen del enlace alternativo
            const response = await fetch(finalFallbackUrl);
            if (!response.ok) throw new Error('Error al obtener la imagen del enlace alternativo.');
            const imageBuffer = await response.buffer();
            await conn.sendMessage(m.chat, { image: imageBuffer, caption: `*Logo con estilo ${style}*` }, { quoted: m });
            await m.react('✅');
        } catch (fallbackError) {
            console.error('Error al obtener la imagen del enlace alternativo:', fallbackError);
            await m.react('✖️');
            return conn.reply(m.chat, `${msm} Error al generar el logo. Intenta con otro estilo o texto.`, m);
        }
    }
}

handler.help = ['crearlogo <estilo> <texto>'];
handler.tags = ['logo'];
handler.command = ['crearlogo', 'logo'];
handler.register = true;
handler.coin = 1;
