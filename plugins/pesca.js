let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
let users = global.db.data.users
let senderId = m.sender
let senderName = conn.getName(senderId)

// Inicializar inventario de pesca si no existe
if (!users[senderId].fish) users[senderId].fish = {}

let tiempo = 4 * 60 // 4 minutos
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
  let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
  m.reply(`🎣 *¡CAÑA EN DESCANSO!* 🎣
🕒 Espera *${tiempo2}* para pescar de nuevo
🌊 Los peces están asustados 🐟`)
  return
}

cooldowns[m.sender] = Date.now()

let fishes = [
  { name: "Sardina", emoji: "🐟", chance: 0.35, rarity: "Común" },
  { name: "Trucha", emoji: "🐠", chance: 0.25, rarity: "Común" },
  { name: "Salmón", emoji: "🍣", chance: 0.15, rarity: "Poco Común" },
  { name: "Atún", emoji: "🐟", chance: 0.10, rarity: "Poco Común" },
  { name: "Pez Espada", emoji: "🗡️", chance: 0.08, rarity: "Raro" },
  { name: "Tiburón", emoji: "🦈", chance: 0.05, rarity: "Épico" },
  { name: "Pulpo Gigante", emoji: "🐙", chance: 0.015, rarity: "Legendario" },
  { name: "Ballena", emoji: "🐋", chance: 0.005, rarity: "Mítico" }
]

let totalChance = 0
let randomValue = Math.random()
let caughtFish = null

// Probabilidad de no pescar nada (20%)
if (randomValue <= 0.20) {
  let failMessages = [
    "🎣 El pez se escapó en el último momento...",
    "🌊 Solo pescaste algas marinas...",
    "🐟 Los peces están muy listos hoy...",
    "⚓ Tu anzuelo se enganchó en algo...",
    "🌪️ Una ola movió tu caña..."
  ]
  let randomFail = failMessages[Math.floor(Math.random() * failMessages.length)]
  conn.reply(m.chat, `🎣 *PESCA FALLIDA* 😞

${randomFail}
🍀 ¡Mejor suerte la próxima vez!`, m)
  return
}

// Ajustar el random para los peces (sin contar el 20% de fallo)
randomValue = (randomValue - 0.20) / 0.80

for (let fish of fishes) {
  totalChance += fish.chance
  if (randomValue <= totalChance) {
    caughtFish = fish
    break
  }
}

if (!caughtFish) caughtFish = fishes[0] // Fallback

// Cantidad pescada (1-3 peces)
let quantity = Math.floor(Math.random() * 3) + 1

// Agregar al inventario
if (!users[senderId].fish[caughtFish.name]) {
  users[senderId].fish[caughtFish.name] = 0
}
users[senderId].fish[caughtFish.name] += quantity

// Mensajes según rareza
let rarityEmoji = {
  "Común": "⚪",
  "Poco Común": "🟢", 
  "Raro": "🔵",
  "Épico": "🟣",
  "Legendario": "🟡",
  "Mítico": "🔴"
}

conn.reply(m.chat, `🎣 *¡PESCA EXITOSA!* ${caughtFish.emoji}

🐟 Pescaste: *${quantity}x ${caughtFish.name}*
${rarityEmoji[caughtFish.rarity]} Rareza: *${caughtFish.rarity}*
📦 Total en inventario: *${users[senderId].fish[caughtFish.name]}*

💡 Usa *${usedPrefix}vender* para vender tus peces`, m)

global.db.write()
}

handler.tags = ['economy']
handler.help = ['pescar']
handler.command = ['pescar', 'fish', 'pesca']
handler.register = true

export default handler

function segundosAHMS(segundos) {
let horas = Math.floor(segundos / 3600)
let minutos = Math.floor((segundos % 3600) / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutos y ${segundosRestantes} segundos`
}
