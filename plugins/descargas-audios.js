import { fetch } from 'node-fetch';
import ytdl from 'ytdl-core';
import yts from 'yt-search';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import stream from 'stream';

// Emojis y mensajes constantes
const emojiMusica = '🎵';
const emojiVideo = '🎬';
const emojiBusqueda = '🔍';
const emojiProcesando = '⏳';
const emojiError = '❌';
const emojiExito = '✅';
const emojiYoutube = '📺';
const emojiAudio = '🎧';
const emojiDescargar = '📥';

// Mensajes estilizados
const waitSearch = '*⏳ Buscando en YouTube...*';
const waitDownload = '*⏳ Descargando audio de alta calidad...*';
const waitConvert = '*⏳ Procesando audio...*';
const dev = '*¡Gracias por usar YT Audio Downloader! Desarrollado con ❤️*';

// Pipeline para streams
const pipeline = promisify(stream.pipeline);

// Configurar la carpeta para descargar archivos
const DOWNLOADS_FOLDER = './downloads';
if (!fs.existsSync(DOWNLOADS_FOLDER)) {
  fs.mkdirSync(DOWNLOADS_FOLDER, { recursive: true });
}

/**
 * Busca un video en YouTube y devuelve la información
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Object>} - Información del video
 */
async function buscarVideo(query) {
  try {
    const resultado = await yts(query);
    if (!resultado.videos.length) return null;
    
    // Obtener el primer resultado
    return resultado.videos[0];
  } catch (e) {
    console.error('Error en la búsqueda:', e);
    return null;
  }
}

/**
 * Descarga el audio de un video de YouTube
 * @param {string} videoId - ID del video de YouTube
 * @param {string} title - Título para el archivo
 * @returns {Promise<Object>} - Información del archivo descargado
 */
async function descargarAudio(videoId, title) {
  try {
    // Limpiar el título para usarlo como nombre de archivo
    const fileName = title
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '_')
      .substring(0, 32);
    
    const audioPath = path.join(DOWNLOADS_FOLDER, `${fileName}.mp3`);
    const tempPath = path.join(DOWNLOADS_FOLDER, `${fileName}_temp.mp4`);
    
    // Opciones para ytdl
    const options = {
      quality: 'highestaudio',
      filter: 'audioonly'
    };
    
    // Descargar stream de audio
    const videoStream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, options);
    
    // Guardar primero como archivo temporal
    await pipeline(videoStream, fs.createWriteStream(tempPath));
    
    // Convertir a MP3 con ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(tempPath)
        .audioCodec('libmp3lame')
        .audioBitrate(320)
        .on('end', () => {
          // Eliminar archivo temporal después de la conversión
          fs.unlinkSync(tempPath);
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        })
        .save(audioPath);
    });
    
    return {
      path: audioPath,
      fileName: `${fileName}.mp3`,
      fileSize: fs.statSync(audioPath).size,
      duration: 0 // Se podría obtener con ffprobe
    };
  } catch (e) {
    console.error('Error en la descarga:', e);
    throw e;
  }
}

/**
 * Formatea la duración del video en formato MM:SS
 * @param {number} seconds - Duración en segundos
 * @returns {string} - Duración formateada
 */
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Formatea el tamaño del archivo en MB
 * @param {number} bytes - Tamaño en bytes
 * @returns {string} - Tamaño formateado
 */
function formatFileSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Handler principal para el comando de descarga de YouTube
 */
let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Verificar si hay texto para buscar
  if (!text) {
    return conn.reply(m.chat, `${emojiError} *Debes proporcionar el nombre del video para descargar*
    
${emojiYoutube} *Uso:* ${usedPrefix}${command} <nombre del video>

${emojiMusica} _Ejemplo: ${usedPrefix}${command} despacito_

${emojiAudio} _La descarga incluye solo el audio en alta calidad_`, m);
  }
  
  await m.react(emojiBusqueda);
  conn.reply(m.chat, waitSearch, m);
  
  try {
    // Buscar el video
    const video = await buscarVideo(text);
    
    if (!video) {
      await m.react(emojiError);
      return conn.reply(m.chat, `${emojiError} No se encontraron resultados para: *${text}*`, m);
    }
    
    // Mostrar información del video encontrado
    let infoMsg = `${emojiBusqueda} *Video encontrado:*\n\n`;
    infoMsg += `${emojiYoutube} *Título:* ${video.title}\n`;
    infoMsg += `${emojiVideo} *Canal:* ${video.author.name}\n`;
    infoMsg += `${emojiMusica} *Duración:* ${formatDuration(video.seconds)}\n`;
    infoMsg += `${emojiDescargar} *Descargando audio, espere un momento...*`;
    
    await conn.reply(m.chat, infoMsg, m);
    await m.react(emojiProcesando);
    
    // Mostrar mensaje de descarga
    conn.reply(m.chat, waitDownload, m);
    
    // Descargar el audio
    const audioInfo = await descargarAudio(video.videoId, video.title);
    
    // Mostrar mensaje de conversión
    conn.reply(m.chat, waitConvert, m);
    
    // Preparar mensaje final
    let caption = `*━━━『 ${emojiAudio} YT AUDIO ${emojiAudio} 』━━━*\n\n`;
    caption += `${emojiYoutube} *Título:* ${video.title}\n`;
    caption += `${emojiVideo} *Canal:* ${video.author.name}\n`;
    caption += `${emojiMusica} *Duración:* ${formatDuration(video.seconds)}\n`;
    caption += `${emojiDescargar} *Tamaño:* ${formatFileSize(audioInfo.fileSize)}\n\n`;
    caption += `${dev}`;
    
    // Enviar el audio
    await conn.sendFile(
      m.chat,
      audioInfo.path,
      audioInfo.fileName,
      caption,
      m,
      false,
      { mimetype: 'audio/mp3' }
    );
    
    await m.react(emojiExito);
    
    // Eliminar el archivo después de enviarlo (opcional)
    fs.unlinkSync(audioInfo.path);
    
  } catch (e) {
    console.error(e);
    await m.react(emojiError);
    return conn.reply(m.chat, `${emojiError} Error al descargar: ${e.message}`, m);
  }
}

handler.help = ['ytmp3 *<nombre del video>*', 'audio *<nombre del video>*'];
handler.tags = ['descargas', 'youtube'];
handler.command = ['ytmp3', 'audio', 'ytaudio', 'yta'];

// Configuraciones adicionales
handler.limit = 2;  // Consumo de límites por descarga
handler.register = true;  // Requiere registro
handler.cooldown = 60;  // Tiempo de espera en segundos entre usos

export default handler;