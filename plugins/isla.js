// Inicializa las islas si no existen
let handler = async (m, { conn }) => {
    let islands = global.db.data.islands
    if (!islands || Object.keys(islands).length < 180) {
        islands = {}
        for (let i = 1; i <= 180; i++) {
            islands[i] = { owner: null, minerals: 100, people: 5, forSale: false, price: 0, miners: 0, hunters: 0, fishers: 0, followers: 0 }
        }
        global.db.data.islands = islands
        m.reply('Islas inicializadas correctamente.')
    } else {
        m.reply('Las islas ya están inicializadas.')
    }
}
handler.tags = ['isla']
handler.help = ['islainit']
handler.command = ['islainit']
handler.group = false
export default handler