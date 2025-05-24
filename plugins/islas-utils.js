// Helper para asegurar que siempre hay islas creadas (280 por defecto)
export function ensureIslands() {
    let islands = global.db.data.islands
    if (!islands || Object.keys(islands).length < 280) {
        islands = {}
        for (let i = 1; i <= 280; i++) {
            islands[i] = {
                owner: null,
                name: `Isla ${i}`,
                minerals: 100,
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
    return global.db.data.islands
}
