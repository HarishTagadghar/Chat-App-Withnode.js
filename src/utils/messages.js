let generateMessage = (text) => {
    return {
        text,
        createdAt:new Date().getTime()
    }
}

let generateLocation = (url) => {
    return {
        url:url,
        createdAt:new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocation
}