
const ignore_list = ['?usp=sharing', '/view', '&export=download', 'uc?id=', '?usp=drivesdk', 'folderview?id=', 'uc?export=download', '&id=', 'open?id=', '?usp=drive_open', '&usp=sharing', 'http://drive.google.com', 'https://drive.google.com']


export function parse_url(url) {
    if (url.startsWith("http://drive.google.com") || url.startsWith("https://drive.google.com")) {
        for (const ig of ignore_list) {
            url = url.replace(ig, "")
        }
        const ids = url.split("/")
        return ids[ids.length - 1]
    } else {
        return null
    }
}
