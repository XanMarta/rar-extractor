const Url = require("./database").Url
const { run_script } = require("./script")
require("dotenv").config()


const workers = {}
const BACKUP = process.env.BACKUP || "false"


async function start_id(id, callback_result, callback_error) {
    let object = await Url.find(id)
    if (object) {
        if (object.completed) {
            callback_result(id, object.url)
        } else if (!workers[id]) {
            await start_worker(id, callback_result, callback_error)
        }
    } else {
        await start_worker(id, callback_result, callback_error)
    }
}


async function start_worker(id, callback_result, callback_error) {
    console.log(`start worker: ${id}`)
    workers[id] = true
    await Url.add(id)
    let result = await run_script(`./script/start.sh ${id}`)
    if (result == null) {
        callback_error(id)
    } else {
        let urls = result.match(/https:\/\/drive\.google\.com\S+/)
        if (urls == null || urls.length == 0) {
            callback_error(id)
        } else {
            let url = urls[0].toString()
            await Url.set_completed(id, url)
            if (BACKUP == "true") {
                run_script(`./script/backup.sh ${id}`)
            }
            callback_result(id, url)
        }
    }
    console.log(`end worker: ${id}`)
    delete workers[id]
}



module.exports = { start_id }
