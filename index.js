const express = require("express")
const cors = require("cors")
const socket = require("socket.io")
const script = require("./src/script")
const db = require("./src/database")
const sock = require("./src/socket")


const PORT = process.env.PORT || 3000

const app = express()
app.use(cors({
    origin: "*"
}))
app.use(express.static("public"));


(async () => {
    await script.init_script()
    await db.connect_db()
    const server = app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`))
    const io = socket(server, {
        cors: {
            origin: "*"
        }
    })
    sock.init_socket(io)
})();
