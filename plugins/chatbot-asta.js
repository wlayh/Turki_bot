import fetch from 'node-fetch'

/**
 * AutoResponder AI - Responds to messages in groups without commands
 * Automatically analyzes conversations and responds when appropriate
 */

// Configuration options
const config = {
  responseRate: 0.15,      // Probability of responding to any message (15%)
  mentionResponseRate: 0.9, // High probability of responding when bot is mentioned
  maxResponseLength: 150,   // Keep responses concise
  cooldownTime: 60000,      // Cooldown between responses (1 minute)
  botName: 'Asta',         // Name the bot will recognize as mentions
  botNameVariants: ['asta', 'ASTA', 'Asta', 'bot'],
  apiEndpoint: 'https://apis-starlights-team.koyeb.app/starlight/gemini'
}

// Track last response time per group to implement cooldown
const lastResponses = {}

// Check if the message likely requires a response
const shouldRespond = (message, chat) => {
  // Don't respond to commands that start with common prefixes
  if (/^[!./#$]/.test(message)) return false
  
  // Check if bot's name was mentioned (high priority)
  const messageLC = message.toLowerCase()
  const nameWasMentioned = config.botNameVariants.some(name => messageLC.includes(name))
  
  if (nameWasMentioned) {
    return Math.random() < config.mentionResponseRate
  }
  
  // Check for question patterns
  const isQuestion = /\?$|\b(quien|que|como|cuando|donde|por que|cual|cuales|cuantos|cuantas)\b/i.test(message)
  
  // Check for direct requests patterns
  const isRequest = /\b(dime|explicame|puedes|podrias|ayudame|cuentame|necesito|quiero saber)\b/i.test(message)
  
  // Check cooldown
  const now = Date.now()
  if (lastResponses[chat] && now - lastResponses[chat] < config.cooldownTime) {
    return false
  }
  
  // Higher chance to respond for questions and requests
  if (isQuestion || isRequest) {
    return Math.random() < (config.responseRate * 2)
  }
  
  // Base response rate for normal messages
  return Math.random() < config.responseRate
}

// Process message to create context for AI
const processMessage = (text) => {
  // Remove any emojis and excessive punctuation
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu, '')
    .replace(/[^\w\s,.?!¿¡]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

var handler = async (m, { conn }) => {
  // Only process text messages in groups
  if (!m.text || !m.isGroup) return
  
  // Get chat ID and message text
  const chatId = m.chat
  const messageText = m.text
  
  // Process the message text
  const processedText = processMessage(messageText)
  
  // Check if this message should get a response
  if (!shouldRespond(processedText, chatId)) return
  
  try {
    // Update typing status
    conn.sendPresenceUpdate('composing', chatId)
    
    // Add a slight delay to seem more natural (500-2000ms)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500))
    
    // Call AI API
    const query = encodeURIComponent(`Responde como si fueras Asta, un bot amigable en una conversación de grupo. Mantén tu respuesta breve, natural y amigable. No uses frases como "como IA" ni "soy una IA". Puedes usar emojis ocasionalmente. Mensaje al que responder: "${processedText}"`)
    const response = await fetch(`${config.apiEndpoint}?text=${query}`)
    const data = await response.json()
    
    if (data && data.result) {
      // Limit response length
      let aiResponse = data.result
      if (aiResponse.length > config.maxResponseLength) {
        aiResponse = aiResponse.substring(0, config.maxResponseLength).trim()
        // Ensure we don't cut off mid-sentence
        const lastPeriod = aiResponse.lastIndexOf('.')
        if (lastPeriod > config.maxResponseLength * 0.7) {
          aiResponse = aiResponse.substring(0, lastPeriod + 1)
        }
      }
      
      // Send the response
      await conn.reply(chatId, aiResponse, m)
      
      // Update cooldown timer
      lastResponses[chatId] = Date.now()
    }
  } catch (error) {
    console.error('AutoResponder AI error:', error)
    // Silently fail - don't notify users about errors
  }
}

// This handler processes all messages
handler.all = true

// Export the handler
export default handler