// Helper para asegurar que siempre hay 280 islas creadas y con minerales individuales
export function ensureIslands() {
    let islands = global.db.data.islands
    if (!islands || Object.keys(islands).length < 280) {
        islands = {}
        for (let i = 1; i <= 280; i++) {
            islands[i] = {
                owner: null,
                name: `Isla ${i}`,
                minerals: 0, // total, para compatibilidad
                iron: 100,
                gold: 50,
                emerald: 10,
                coal: 200,
                stone: 500,
                people: 5,
                forSale: false,
                price: 0,
                miners: 0,
                hunters: 0,
                fishers: 0,
                followers: 0,
                resources: []
            }
        }
        global.db.data.islands = islands
    }
    // Asegura que cada isla tenga sus minerales individuales
    for (let id of Object.keys(global.db.data.islands)) {
        let isla = global.db.data.islands[id]
        if (isla.iron === undefined) isla.iron = 100
        if (isla.gold === undefined) isla.gold = 50
        if (isla.emerald === undefined) isla.emerald = 10
        if (isla.coal === undefined) isla.coal = 200
        if (isla.stone === undefined) isla.stone = 500
        if (isla.minerals === undefined) isla.minerals = isla.iron + isla.gold + isla.emerald + isla.coal + isla.stone
    }
    return global.db.data.islands
}
