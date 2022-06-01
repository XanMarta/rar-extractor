const MongoClient = require("mongodb").MongoClient
require("dotenv").config()

const DB_ENDPOINT = process.env.DB_ENDPOINT
const DB_NAME = "rar"
const db = {}
db.collections = {}
db.modules = {}


function _init(db_module) {
    db.collections[db_module.name] = {}
    let modules = db_module.func(db.collections[db_module.name])
    db.modules[db_module.name] = modules
    return modules
}

db.connect_db = async () => {   // Must be called first
    console.log("Connecting to database ...")
    try {
        db.client = new MongoClient(DB_ENDPOINT)
        await db.client.connect()
        console.log("Database connected")
        db.db = db.client.db(DB_NAME)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
    // Init db
    for (var col_name in db.collections) {
        console.log(`Set collection: ${col_name}`)
        db.collections[col_name].collection = db.db.collection(col_name)
    }
    for (var col_name in db.modules) {
        if (db.modules[col_name]._init) {
            await db.modules[col_name]._init()
        }
    }
}

// Set collection

db.Url = _init(require("./url.model"))


module.exports = db
