let handler = async (m, { conn, text, command, usedPrefix }) => {
    let users = global.db.data.users
    let senderId = m.sender
    
    // Inicializar inventario si no existe
    if (!users[senderId].fish) users[senderId].fish = {}
    
    let fishPrices = {
      "Sardina": { price: [5, 8], emoji: "🐟" },
      "Trucha": { price: [8, 12], emoji: "🐠" },
      "Salmón": { price: [15, 20], emoji: "🍣" },
      "Atún": { price: [18, 25], emoji: "🐟" },
      "Pez Espada": { price: [30, 40], emoji: "🗡️" },
      "Tiburón": { price: [50, 70], emoji: "🦈" },
      "Pulpo Gigante": { price: [80, 120], emoji: "🐙" },
      "Ballena": { price: [150, 200], emoji: "🐋" }
    }
    
    let args = text.trim().split(' ')
    let fishName = args[0]
    let quantity = parseInt(args[1]) || 1
    
    // Si no especifica qué vender, mostrar inventario
    if (!fishName) {
      let inventory = Object.keys(users[senderId].fish).filter(fish => users[senderId].fish[fish] > 0)
      
      if (inventory.length === 0) {
        m.reply(`🎣 *INVENTARIO VACÍO* 📦
    
    🐟 No tienes peces para vender
    💡 Usa *${usedPrefix}pescar* para conseguir peces
    
    💰 Precios de venta:
    ${Object.entries(fishPrices).map(([fish, data]) => 
      `${data.emoji} ${fish}: ${data.price[0]}-${data.price[1]} ${moneda}`
    ).join('\n')}`)
        return
      }
    
      let inventoryText = inventory.map(fish => 
        `${fishPrices[fish]?.emoji || '🐟'} ${fish}: *${users[senderId].fish[fish]}* (${fishPrices[fish]?.price[0] || 5}-${fishPrices[fish]?.price[1] || 10} ${moneda} c/u)`
      ).join('\n')
    
      m.reply(`🎣 *TU INVENTARIO* 📦
    
    ${inventoryText}
    
    💡 Uso: *${usedPrefix + command} <pez> [cantidad]*
    📝 Ejemplo: *${usedPrefix + command} Sardina 5*
    💰 Para vender todo: *${usedPrefix + command} todo*`)
      return
    }
    
    // Vender todo el inventario
    if (fishName.toLowerCase() === 'todo') {
      let totalValue = 0
      let soldItems = []
      
      for (let fish in users[senderId].fish) {
        if (users[senderId].fish[fish] > 0 && fishPrices[fish]) {
          let qty = users[senderId].fish[fish]
          let minPrice = fishPrices[fish].price[0]
          let maxPrice = fishPrices[fish].price[1]
          let pricePerFish = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice
          let fishValue = qty * pricePerFish
          
          totalValue += fishValue
          soldItems.push(`${fishPrices[fish].emoji} ${fish}: ${qty}x = ${fishValue} ${moneda}`)
          users[senderId].fish[fish] = 0
        }
      }
      
      if (totalValue === 0) {
        m.reply(`📦 *¡NO HAY NADA QUE VENDER!* 📦
    🐟 Tu inventario está vacío`)
        return
      }
      
      users[senderId].coin += totalValue
      
      conn.reply(m.chat, `💰 *¡VENTA MASIVA REALIZADA!* 🤑
    
    📋 *Resumen de venta:*
    ${soldItems.join('\n')}
    
    💸 *Total ganado: ${totalValue} ${moneda}*
    💳 *Balance actual: ${users[senderId].coin} ${moneda}*`, m)
      
      global.db.write()
      return
    }
    
    // Vender pez específico
    if (!fishPrices[fishName]) {
      m.reply(`🐟 *PEZ NO VÁLIDO* ❌
    
    💡 Peces disponibles:
    ${Object.keys(fishPrices).join(', ')}
    
    📝 Usa: *${usedPrefix + command}* para ver tu inventario`)
      return
    }
    
    let availableQuantity = users[senderId].fish[fishName] || 0
    if (availableQuantity === 0) {
      m.reply(`📦 *¡NO TIENES ESE PEZ!* 📦
    
    ${fishPrices[fishName].emoji} No tienes *${fishName}* en tu inventario
    🎣 Ve a pescar primero con *${usedPrefix}pescar*`)
      return
    }
    
    if (quantity > availableQuantity) {
      m.reply(`📦 *¡CANTIDAD INSUFICIENTE!* 📦
    
    ${fishPrices[fishName].emoji} Tienes: *${availableQuantity}* ${fishName}
    ❌ Quieres vender: *${quantity}*`)
      return
    }
    
    // Calcular precio aleatorio dentro del rango
    let minPrice = fishPrices[fishName].price[0]
    let maxPrice = fishPrices[fishName].price[1]
    let pricePerFish = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice
    let totalValue = quantity * pricePerFish
    
    // Realizar venta
    users[senderId].fish[fishName] -= quantity
    users[senderId].coin += totalValue
    
    conn.reply(m.chat, `💰 *¡VENTA REALIZADA!* 🤑
    
    ${fishPrices[fishName].emoji} Vendiste: *${quantity}x ${fishName}*
    💵 Precio unitario: *${pricePerFish} ${moneda}*
    💸 Total ganado: *${totalValue} ${moneda}*
    📦 Te quedan: *${users[senderId].fish[fishName]} ${fishName}*
    💳 Balance: *${users[senderId].coin} ${moneda}*`, m)
    
    global.db.write()
    }
    
    handler.tags = ['economy']
    handler.help = ['vender']
    handler.command = ['vender', 'sell', 'venta']
    handler.register = true
    handler.group = true
    
    export default handler
