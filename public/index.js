
import { parse_url } from "./js/util.js"
import { send_id, set_on_invalid, set_on_receive } from "./js/socket.js"


const input_url = document.getElementById("input_url")
const button_submit = document.getElementById("button_submit")
const text_progress = document.getElementById("progress")
const text_result = document.getElementById("result")


button_submit.onclick = () => {
    if (input_url.value == "") {
        alert("Please input drive url")
    } else {
        let id = parse_url(input_url.value)
        if (id == null) {
            alert("Invalid URL")
        } else {
            text_progress.innerHTML = "Uploading ..."
            button_submit.style.display = "none"
            upload(id)
        }
    }
}


function upload(id) {
    set_on_receive((rid, url) => {
        if (id == rid) {
            text_progress.style.display = "none"
            text_result.innerHTML = `Result:
            <a href="${url}">${url}</a>`
        }
    })
    set_on_invalid((rid) => {
        if (id == rid) {
            text_progress.style.display = "none"
            text_result.innerHTML = "An error has occured"
        }
    })
    send_id(id)
}
