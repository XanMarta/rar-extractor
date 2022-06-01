const socket = io()

var on_receive = (rid, url) => {}
var on_invalid = (rid) => {}

socket.on("receive", (rid, url) => on_receive(rid, url))
socket.on("invalid", (rid) => on_invalid(rid))


export function send_id(id) {
    socket.emit("send", id)
}


export function set_on_receive(callback) {
    on_receive = callback
}


export function set_on_invalid(callback) {
    on_invalid = callback
}
