
const { start_id } = require("./controller")

const sockets = []


function init_socket(io) {
    io.on("connection", (socket) => {
        sockets.push(socket)
        // console.log("Socket connected: " + socket.id)

        socket.on("send", async (id) => {
            console.log(`ID: ${id}`)
            await start_id(id, callback_result, callback_error)
        })

        socket.on("disconnect", () => {
            // console.log("Socket disconnected: " + socket.id)
            sockets.pop(socket)
        })
    })
}


function callback_result(rid, url) {
    for (const socket of sockets) {
        socket.emit("receive", rid, url)
    }
}


function callback_error(rid) {
    for (const socket of sockets) {
        socket.emit("invalid", rid)
    }
}


module.exports = { init_socket }

