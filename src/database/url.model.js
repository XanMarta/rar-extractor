
module.exports = {
    name: "Url",
    func: (col) => {
        return {
            _init: async () => {
                await col.collection.createIndex({ id: 1 }, { unique: true })
            },
            add: async (id) => {
                await col.collection.updateOne({
                    id: id
                }, {
                    $setOnInsert: {
                        url: "",
                        completed: false
                    }
                }, {
                    upsert: true
                })
            },
            get: async () => {
                let result = await col.collection.find().toArray()
                return result
            },
            find: async (id) => {
                let result = await col.collection.find({
                    id: id
                }).toArray()
                return result[0]
            },
            set_completed: async (id, url) => {
                await col.collection.updateOne({
                    id: id
                }, {
                    $set: {
                        url: url,
                        completed: true
                    }
                })
            }
        }
    }
}
