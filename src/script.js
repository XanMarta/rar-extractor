const fs = require("fs")
const util = require("util")
const exec = util.promisify(require("child_process").exec)
require("dotenv").config()


const bin_path = "./dist/rclone"
const config_path = "./dist/rclone.conf"
const CONFIG_BASE = process.env.CONFIG_BASE


async function run_script(script_path) {
    console.log(`Run script: ${script_path}`)
    try {
        const { stdout } = await exec(`sh ${script_path}`)
        return stdout
    } catch (err) {
        console.log("Error: " + err)
        return null
    }
}



async function init_script() {
    console.log("Initiating ...")
    if (!fs.existsSync(bin_path)) {
        let result = await run_script("./script/init.sh")
        if (result == null) {
            throw new Error("Cannot init script")
        }
    }
    if (!fs.existsSync(config_path)) {
        await fs.promises.writeFile(config_path, CONFIG_BASE, "base64")
    }
}


module.exports = { init_script, run_script }
