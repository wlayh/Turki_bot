// SISTEMA DE VENTA PARA PESCA
let sellHandler = async (m, { conn, text, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  
  // Inicializar inventarios si no existen
  if (!users[senderId].fish) users[senderId].fish = {}
  if (!users[senderId].treasures) users[senderId].treasures = {}
  if (!users[senderId].junk) users[senderId].junk = {}
  
  // Precios de los peces
  let fishPrices = {
      "Sardina": 5,
      "Trucha": 8,
      "Salmón": 15,
      "Atún": 20,
      "Pez Espada": 35,
      "Pez Dorado": 50,
      "Tiburón": 80,
      "Pez Dragón": 120,
      "Pulpo Gigante": 200,
      "Ballena": 350,
      "Kraken": 500
  }
  
  // Precios de los tesoros
  let treasurePrices = {
      "Concha Marina": 10,
      "Perla": 25,
      "Collar de Algas": 30,
      "Moneda Antigua": 40,
      "Anillo Dorado": 60,
      "Brújula Mágica": 100,
      "Espada del Mar": 150,
      "Corona de Tritón": 300,
      "Cofre del Tesoro": 250,
      "Tridente de Poseidón": 500,
      "Cofre Mítico": 800
  }
  
  let args = text.trim().split(' ')
  let action = args[0]?.toLowerCase()
  
  // Si no hay argumentos, mostrar menú
  if (!action) {
      let fishInventory = Object.keys(users[senderId].fish).filter(fish => users[senderId].fish[fish] > 0)
      let treasureInventory = Object.keys(users[senderId].treasures).filter(treasure => users[senderId].treasures[treasure] > 0)
      
      if (fishInventory.length === 0 && treasureInventory.length === 0) {
          m.reply(`🏪 *TIENDA DE PESCA* 🏪
          
📦 No tienes nada para vender
🎣 Ve a pescar primero con *${usedPrefix}pescar*`)
          return
      }
      
      let message = `🏪 *TIENDA DE PESCA* 💰

📋 *Comandos disponibles:*
• *${usedPrefix}vender todo* - Vender todo
• *${usedPrefix}vender peces* - Vender todos los peces
• *${usedPrefix}vender tesoros* - Vender todos los tesoros
• *${usedPrefix}vender <item>* - Vender item específico
• *${usedPrefix}vender precios* - Ver tabla de precios

💡 *Ejemplo:* ${usedPrefix}vender Salmón`
      
      // Mostrar inventario vendible con precios
      if (fishInventory.length > 0) {
          message += `\n\n🐟 *PECES DISPONIBLES:*\n`
          fishInventory.forEach(fish => {
              let quantity = users[senderId].fish[fish]
              let price = fishPrices[fish] || 1
              let total = quantity * price
              message += `• ${fish}: ${quantity}x (${price} c/u = ${total} ${moneda})\n`
          })
      }
      
      if (treasureInventory.length > 0) {
          message += `\n✨ *TESOROS DISPONIBLES:*\n`
          treasureInventory.forEach(treasure => {
              let quantity = users[senderId].treasures[treasure]
              let price = treasurePrices[treasure] || 1
              let total = quantity * price
              message += `• ${treasure}: ${quantity}x (${price} c/u = ${total} ${moneda})\n`
          })
      }
      
      conn.reply(m.chat, message, m)
      return
  }
  
  // Mostrar tabla de precios
  if (action === 'precios' || action === 'precio') {
      let message = `💰 *TABLA DE PRECIOS* 💰

🐟 *PECES:*
${Object.entries(fishPrices).map(([fish, price]) => 
  `• ${fish}: ${price} ${moneda}`
).join('\n')}

✨ *TESOROS:*
${Object.entries(treasurePrices).map(([treasure, price]) => 
  `• ${treasure}: ${price} ${moneda}`
).join('\n')}

💡 Los precios pueden variar según la rareza`
      
      conn.reply(m.chat, message, m)
      return
  }
  
  let totalEarned = 0
  let soldItems = []
  
  if (action === 'todo' || action === 'all') {
      // Vender todo
      // Vender peces
      for (let fish of Object.keys(users[senderId].fish)) {
          if (users[senderId].fish[fish] > 0) {
              let quantity = users[senderId].fish[fish]
              let price = fishPrices[fish] || 1
              let earnings = quantity * price
              totalEarned += earnings
              soldItems.push(`🐟 ${fish}: ${quantity}x = ${earnings} ${moneda}`)
              users[senderId].fish[fish] = 0
          }
      }
      
      // Vender tesoros (excepto cofres)
      for (let treasure of Object.keys(users[senderId].treasures)) {
          if (users[senderId].treasures[treasure] > 0 && !treasure.includes("Cofre")) {
              let quantity = users[senderId].treasures[treasure]
              let price = treasurePrices[treasure] || 1
              let earnings = quantity * price
              totalEarned += earnings
              soldItems.push(`✨ ${treasure}: ${quantity}x = ${earnings} ${moneda}`)
              users[senderId].treasures[treasure] = 0
          }
      }
      
  } else if (action === 'peces' || action === 'fish') {
      // Vender solo peces
      for (let fish of Object.keys(users[senderId].fish)) {
          if (users[senderId].fish[fish] > 0) {
              let quantity = users[senderId].fish[fish]
              let price = fishPrices[fish] || 1
              let earnings = quantity * price
              totalEarned += earnings
              soldItems.push(`🐟 ${fish}: ${quantity}x = ${earnings} ${moneda}`)
              users[senderId].fish[fish] = 0
          }
      }
      
  } else if (action === 'tesoros' || action === 'treasures') {
      // Vender solo tesoros (excepto cofres)
      for (let treasure of Object.keys(users[senderId].treasures)) {
          if (users[senderId].treasures[treasure] > 0 && !treasure.includes("Cofre")) {
              let quantity = users[senderId].treasures[treasure]
              let price = treasurePrices[treasure] || 1
              let earnings = quantity * price
              totalEarned += earnings
              soldItems.push(`✨ ${treasure}: ${quantity}x = ${earnings} ${moneda}`)
              users[senderId].treasures[treasure] = 0
          }
      }
      
  } else {
      // Vender item específico
      let itemName = text.trim()
      let found = false
      
      // Buscar en peces
      if (users[senderId].fish[itemName] && users[senderId].fish[itemName] > 0) {
          let quantity = users[senderId].fish[itemName]
          let price = fishPrices[itemName] || 1
          let earnings = quantity * price
          totalEarned = earnings
          soldItems.push(`🐟 ${itemName}: ${quantity}x = ${earnings} ${moneda}`)
          users[senderId].fish[itemName] = 0
          found = true
      }
      
      // Buscar en tesoros
      if (!found && users[senderId].treasures[itemName] && users[senderId].treasures[itemName] > 0) {
          // No permitir vender cofres directamente
          if (itemName.includes("Cofre")) {
              m.reply(`🚫 *NO PUEDES VENDER COFRES* 🚫
              
🗝️ Los cofres deben ser abiertos, no vendidos
💡 Usa *${usedPrefix}abrir ${itemName}* para abrirlo`)
              return
          }
          
          let quantity = users[senderId].treasures[itemName]
          let price = treasurePrices[itemName] || 1
          let earnings = quantity * price
          totalEarned = earnings
          soldItems.push(`✨ ${itemName}: ${quantity}x = ${earnings} ${moneda}`)
          users[senderId].treasures[itemName] = 0
          found = true
      }
      
      if (!found) {
          m.reply(`❌ *ITEM NO ENCONTRADO* ❌
          
📦 No tienes "${itemName}" en tu inventario
💡 Usa *${usedPrefix}vender* para ver qué puedes vender`)
          return
      }
  }
  
  if (soldItems.length === 0) {
      m.reply(`📦 *NADA PARA VENDER* 📦
      
🎣 No tienes elementos vendibles
💡 Los cofres no se pueden vender, deben abrirse`)
      return
  }
  
  // Agregar monedas ganadas
  users[senderId].coin = (users[senderId].coin || 0) + totalEarned
  
  // Bonus por vender mucho
  let bonus = 0
  if (soldItems.length >= 5) {
      bonus = Math.floor(totalEarned * 0.1) // 10% bonus
      users[senderId].coin += bonus
  }
  
  let message = `🏪 *¡VENTA EXITOSA!* 💰

📋 *Elementos vendidos:*
${soldItems.join('\n')}

💰 *Total ganado: ${totalEarned} ${moneda}*`

  if (bonus > 0) {
      message += `\n🎉 *Bonus por venta masiva: ${bonus} ${moneda}*`
  }
  
  message += `\n💳 *Balance actual: ${users[senderId].coin} ${moneda}*`
  
  // Mensajes especiales según cantidad vendida
  if (totalEarned >= 1000) {
      message += `\n\n🌟 *¡Venta millonaria! Eres un maestro pescador!* 🎣`
  } else if (totalEarned >= 500) {
      message += `\n\n⭐ *¡Excelente venta! Tu negocio va muy bien!* 📈`
  } else if (totalEarned >= 100) {
      message += `\n\n✨ *¡Buena venta! Sigue así!* 👍`
  }
  
  conn.reply(m.chat, message, m)
  global.db.write()
}

// COMANDO PARA VER VALOR DEL INVENTARIO
let valueHandler = async (m, { conn, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  
  if (!users[senderId].fish) users[senderId].fish = {}
  if (!users[senderId].treasures) users[senderId].treasures = {}
  
  let fishPrices = {
      "Sardina": 5, "Trucha": 8, "Salmón": 15, "Atún": 20,
      "Pez Espada": 35, "Pez Dorado": 50, "Tiburón": 80,
      "Pez Dragón": 120, "Pulpo Gigante": 200, "Ballena": 350, "Kraken": 500
  }
  
  let treasurePrices = {
      "Concha Marina": 10, "Perla": 25, "Collar de Algas": 30,
      "Moneda Antigua": 40, "Anillo Dorado": 60, "Brújula Mágica": 100,
      "Espada del Mar": 150, "Corona de Tritón": 300, "Cofre del Tesoro": 250,
      "Tridente de Poseidón": 500, "Cofre Mítico": 800
  }
  
  let fishValue = 0
  let treasureValue = 0
  
  // Calcular valor de peces
  for (let fish of Object.keys(users[senderId].fish)) {
      if (users[senderId].fish[fish] > 0) {
          fishValue += users[senderId].fish[fish] * (fishPrices[fish] || 1)
      }
  }
  
  // Calcular valor de tesoros (excepto cofres)
  for (let treasure of Object.keys(users[senderId].treasures)) {
      if (users[senderId].treasures[treasure] > 0 && !treasure.includes("Cofre")) {
          treasureValue += users[senderId].treasures[treasure] * (treasurePrices[treasure] || 1)
      }
  }
  
  let totalValue = fishValue + treasureValue
  let currentCoins = users[senderId].coin || 0
  let netWorth = totalValue + currentCoins
  
  let message = `💎 *VALORACIÓN DE INVENTARIO* 💎

🐟 *Valor de peces:* ${fishValue} ${moneda}
✨ *Valor de tesoros:* ${treasureValue} ${moneda}
💰 *Monedas actuales:* ${currentCoins} ${moneda}

📊 *VALOR TOTAL VENDIBLE:* ${totalValue} ${moneda}
🏆 *PATRIMONIO TOTAL:* ${netWorth} ${moneda}

💡 Usa *${usedPrefix}vender* para convertir en monedas`

  // Clasificación por riqueza
  if (netWorth >= 5000) {
      message += `\n\n👑 *¡MAGNATE PESQUERO!* - Eres increíblemente rico`
  } else if (netWorth >= 2000) {
      message += `\n\n💎 *COMERCIANTE PRÓSPERO* - Tienes una gran fortuna`
  } else if (netWorth >= 1000) {
      message += `\n\n⭐ *PESCADOR EXITOSO* - Tu negocio va muy bien`
  } else if (netWorth >= 500) {
      message += `\n\n🎣 *PESCADOR COMPETENTE* - Vas por buen camino`
  } else {
      message += `\n\n🌱 *PESCADOR NOVATO* - ¡Sigue pescando para crecer!`
  }
      
  conn.reply(m.chat, message, m)
}

// Handler para vender
let sellHandlerExport = sellHandler
sellHandlerExport.tags = ['economy']
sellHandlerExport.help = ['vender']
sellHandlerExport.command = ['vender', 'sell', 'venta']
sellHandlerExport.register = true

// Handler para valorar
let valueHandlerExport = valueHandler
valueHandlerExport.tags = ['economy']  
valueHandlerExport.help = ['valorar']
valueHandlerExport.command = ['valorar', 'valor', 'value', 'patrimonio']
valueHandlerExport.register = true

export { sellHandlerExport as vender }
export { valueHandlerExport as valorar }
