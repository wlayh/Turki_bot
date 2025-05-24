// SISTEMA DE VENTA PARA CAZA
let sellHandler = async (m, { conn, text, usedPrefix }) => {
    let users = global.db.data.users
    let senderId = m.sender
    
    // Inicializar inventarios si no existen
    if (!users[senderId].animals) users[senderId].animals = {}
    if (!users[senderId].trophies) users[senderId].trophies = {}
    if (!users[senderId].huntJunk) users[senderId].huntJunk = {}
    
    // Precios de los animales
    let animalPrices = {
        "Conejo": 8,
        "Ardilla": 6,
        "Pato": 10,
        "Ciervo": 25,
        "Jabalí": 30,
        "Lobo": 45,
        "Oso": 60,
        "Águila": 100,
        "León": 150,
        "Tigre": 250,
        "Dragón": 400,
        "Fénix": 600
    }
    
    // Precios de los trofeos
    let trophyPrices = {
        "Pluma Rara": 12,
        "Cuerno Pequeño": 20,
        "Piel de Calidad": 35,
        "Colmillo Afilado": 50,
        "Garra Poderosa": 70,
        "Cuerno Dorado": 120,
        "Piel Legendaria": 180,
        "Corona de Bestia": 350,
        "Cofre de Cazador": 300,
        "Reliquia Ancestral": 550,
        "Cofre Mítico": 900
    }
    
    let args = text.trim().split(' ')
    let action = args[0]?.toLowerCase()
    
    // Si no hay argumentos, mostrar menú
    if (!action) {
        let animalInventory = Object.keys(users[senderId].animals).filter(animal => users[senderId].animals[animal] > 0)
        let trophyInventory = Object.keys(users[senderId].trophies).filter(trophy => users[senderId].trophies[trophy] > 0)
        
        if (animalInventory.length === 0 && trophyInventory.length === 0) {
            m.reply(`🏪 *MERCADO DE CAZA* 🏪
            
📦 No tienes nada para vender
🏹 Ve a cazar primero con *${usedPrefix}cazar*`)
            return
        }
        
        let message = `🏪 *MERCADO DE CAZA* 💰

📋 *Comandos disponibles:*
• *${usedPrefix}vendercaza todo* - Vender todo
• *${usedPrefix}vendercaza animales* - Vender todos los animales
• *${usedPrefix}vendercaza trofeos* - Vender todos los trofeos
• *${usedPrefix}vendercaza <item>* - Vender item específico
• *${usedPrefix}vendercaza precios* - Ver tabla de precios

💡 *Ejemplo:* ${usedPrefix}vendercaza Ciervo`
        
        // Mostrar inventario vendible con precios
        if (animalInventory.length > 0) {
            message += `\n\n🦌 *ANIMALES DISPONIBLES:*\n`
            animalInventory.forEach(animal => {
                let quantity = users[senderId].animals[animal]
                let price = animalPrices[animal] || 1
                let total = quantity * price
                message += `• ${animal}: ${quantity}x (${price} c/u = ${total} ${moneda})\n`
            })
        }
        
        if (trophyInventory.length > 0) {
            message += `\n🏆 *TROFEOS DISPONIBLES:*\n`
            trophyInventory.forEach(trophy => {
                let quantity = users[senderId].trophies[trophy]
                let price = trophyPrices[trophy] || 1
                let total = quantity * price
                message += `• ${trophy}: ${quantity}x (${price} c/u = ${total} ${moneda})\n`
            })
        }
        
        conn.reply(m.chat, message, m)
        return
    }
    
    // Mostrar tabla de precios
    if (action === 'precios' || action === 'precio') {
        let message = `💰 *TABLA DE PRECIOS DE CAZA* 💰

🦌 *ANIMALES:*
${Object.entries(animalPrices).map(([animal, price]) => 
    `• ${animal}: ${price} ${moneda}`
).join('\n')}

🏆 *TROFEOS:*
${Object.entries(trophyPrices).map(([trophy, price]) => 
    `• ${trophy}: ${price} ${moneda}`
).join('\n')}

💡 Los precios varían según la rareza del animal`
        
        conn.reply(m.chat, message, m)
        return
    }
    
    let totalEarned = 0
    let soldItems = []
    
    if (action === 'todo' || action === 'all') {
        // Vender todo
        // Vender animales
        for (let animal of Object.keys(users[senderId].animals)) {
            if (users[senderId].animals[animal] > 0) {
                let quantity = users[senderId].animals[animal]
                let price = animalPrices[animal] || 1
                let earnings = quantity * price
                totalEarned += earnings
                soldItems.push(`🦌 ${animal}: ${quantity}x = ${earnings} ${moneda}`)
                users[senderId].animals[animal] = 0
            }
        }
        
        // Vender trofeos (excepto cofres)
        for (let trophy of Object.keys(users[senderId].trophies)) {
            if (users[senderId].trophies[trophy] > 0 && !trophy.includes("Cofre")) {
                let quantity = users[senderId].trophies[trophy]
                let price = trophyPrices[trophy] || 1
                let earnings = quantity * price
                totalEarned += earnings
                soldItems.push(`🏆 ${trophy}: ${quantity}x = ${earnings} ${moneda}`)
                users[senderId].trophies[trophy] = 0
            }
        }
        
    } else if (action === 'animales' || action === 'animals') {
        // Vender solo animales
        for (let animal of Object.keys(users[senderId].animals)) {
            if (users[senderId].animals[animal] > 0) {
                let quantity = users[senderId].animals[animal]
                let price = animalPrices[animal] || 1
                let earnings = quantity * price
                totalEarned += earnings
                soldItems.push(`🦌 ${animal}: ${quantity}x = ${earnings} ${moneda}`)
                users[senderId].animals[animal] = 0
            }
        }
        
    } else if (action === 'trofeos' || action === 'trophies') {
        // Vender solo trofeos (excepto cofres)
        for (let trophy of Object.keys(users[senderId].trophies)) {
            if (users[senderId].trophies[trophy] > 0 && !trophy.includes("Cofre")) {
                let quantity = users[senderId].trophies[trophy]
                let price = trophyPrices[trophy] || 1
                let earnings = quantity * price
                totalEarned += earnings
                soldItems.push(`🏆 ${trophy}: ${quantity}x = ${earnings} ${moneda}`)
                users[senderId].trophies[trophy] = 0
            }
        }
        
    } else {
        // Vender item específico
        let itemName = text.trim()
        let found = false
        
        // Buscar en animales
        if (users[senderId].animals[itemName] && users[senderId].animals[itemName] > 0) {
            let quantity = users[senderId].animals[itemName]
            let price = animalPrices[itemName] || 1
            let earnings = quantity * price
            totalEarned = earnings
            soldItems.push(`🦌 ${itemName}: ${quantity}x = ${earnings} ${moneda}`)
            users[senderId].animals[itemName] = 0
            found = true
        }
        
        // Buscar en trofeos
        if (!found && users[senderId].trophies[itemName] && users[senderId].trophies[itemName] > 0) {
            // No permitir vender cofres directamente
            if (itemName.includes("Cofre")) {
                m.reply(`🚫 *NO PUEDES VENDER COFRES* 🚫
                
🗝️ Los cofres deben ser abiertos, no vendidos
💡 Usa *${usedPrefix}abrir ${itemName}* para abrirlo`)
                return
            }
            
            let quantity = users[senderId].trophies[itemName]
            let price = trophyPrices[itemName] || 1
            let earnings = quantity * price
            totalEarned = earnings
            soldItems.push(`🏆 ${itemName}: ${quantity}x = ${earnings} ${moneda}`)
            users[senderId].trophies[itemName] = 0
            found = true
        }
        
        if (!found) {
            m.reply(`❌ *ITEM NO ENCONTRADO* ❌
            
📦 No tienes "${itemName}" en tu inventario
💡 Usa *${usedPrefix}vendercaza* para ver qué puedes vender`)
            return
        }
    }
    
    if (soldItems.length === 0) {
        m.reply(`📦 *NADA PARA VENDER* 📦
        
🏹 No tienes elementos vendibles
💡 Los cofres no se pueden vender, deben abrirse`)
        return
    }
    
    // Agregar monedas ganadas
    users[senderId].coin = (users[senderId].coin || 0) + totalEarned
    
    // Bonus por vender mucho
    let bonus = 0
    if (soldItems.length >= 5) {
        bonus = Math.floor(totalEarned * 0.12) // 12% bonus
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
    if (totalEarned >= 1500) {
        message += `\n\n🌟 *¡Venta extraordinaria! Eres un maestro cazador!* 🏹`
    } else if (totalEarned >= 800) {
        message += `\n\n⭐ *¡Excelente venta! Tu negocio de caza prospera!* 📈`
    } else if (totalEarned >= 200) {
        message += `\n\n✨ *¡Buena venta! Continúa cazando!* 👍`
    }
    
    conn.reply(m.chat, message, m)
    global.db.write()
}

// COMANDO PARA VER VALOR DEL INVENTARIO DE CAZA
let valueHandler = async (m, { conn, usedPrefix }) => {
    let users = global.db.data.users
    let senderId = m.sender
    
    if (!users[senderId].animals) users[senderId].animals = {}
    if (!users[senderId].trophies) users[senderId].trophies = {}
    
    let animalPrices = {
        "Conejo": 8, "Ardilla": 6, "Pato": 10, "Ciervo": 25,
        "Jabalí": 30, "Lobo": 45, "Oso": 60, "Águila": 100,
        "León": 150, "Tigre": 250, "Dragón": 400, "Fénix": 600
    }
    
    let trophyPrices = {
        "Pluma Rara": 12, "Cuerno Pequeño": 20, "Piel de Calidad": 35,
        "Colmillo Afilado": 50, "Garra Poderosa": 70, "Cuerno Dorado": 120,
        "Piel Legendaria": 180, "Corona de Bestia": 350, "Cofre de Cazador": 300,
        "Reliquia Ancestral": 550, "Cofre Mítico": 900
    }
    
    let animalValue = 0
    let trophyValue = 0
    
    // Calcular valor de animales
    for (let animal of Object.keys(users[senderId].animals)) {
        if (users[senderId].animals[animal] > 0) {
            animalValue += users[senderId].animals[animal] * (animalPrices[animal] || 1)
        }
    }
    
    // Calcular valor de trofeos (excepto cofres)
    for (let trophy of Object.keys(users[senderId].trophies)) {
        if (users[senderId].trophies[trophy] > 0 && !trophy.includes("Cofre")) {
            trophyValue += users[senderId].trophies[trophy] * (trophyPrices[trophy] || 1)
        }
    }
    
    let totalValue = animalValue + trophyValue
    let currentCoins = users[senderId].coin || 0
    let netWorth = totalValue + currentCoins
    
    let message = `💎 *VALORACIÓN DE INVENTARIO DE CAZA* 💎

🦌 *Valor de animales:* ${animalValue} ${moneda}
🏆 *Valor de trofeos:* ${trophyValue} ${moneda}
💰 *Monedas actuales:* ${currentCoins} ${moneda}

📊 *VALOR TOTAL VENDIBLE:* ${totalValue} ${moneda}
🏆 *PATRIMONIO TOTAL:* ${netWorth} ${moneda}

💡 Usa *${usedPrefix}vendercaza* para convertir en monedas`

    // Clasificación por riqueza
    if (netWorth >= 8000) {
        message += `\n\n👑 *¡REY DE LA CAZA!* - Eres legendariamente rico`
    } else if (netWorth >= 4000) {
        message += `\n\n💎 *MAESTRO CAZADOR* - Tienes una fortuna impresionante`
    } else if (netWorth >= 2000) {
        message += `\n\n⭐ *CAZADOR EXPERTO* - Tu negocio va excelente`
    } else if (netWorth >= 800) {
        message += `\n\n🏹 *CAZADOR HÁBIL* - Vas por muy buen camino`
    } else {
        message += `\n\n🌱 *CAZADOR NOVATO* - ¡Sigue cazando para prosperar!`
    }
        
    conn.reply(m.chat, message, m)
}

// Handler para vender caza
let sellHandlerExport = sellHandler
sellHandlerExport.tags = ['economy']
sellHandlerExport.help = ['vendercaza']
sellHandlerExport.command = ['vendercaza', 'sellhunt', 'ventacaza']
sellHandlerExport.register = true

// Handler para valorar caza
let valueHandlerExport = valueHandler
valueHandlerExport.tags = ['economy']  
valueHandlerExport.help = ['valorarcaza']
valueHandlerExport.command = ['valorarcaza', 'valuehunt', 'patrimoniocaza']
valueHandlerExport.register = true

export { sellHandlerExport as vendercaza }
export { valueHandlerExport as valorarcaza }
