require('dotenv-flow').config()

const config = {
    CHATGPT_APIKEY: process.env.CHATGPT_APIKEY,
    CHATGPT_ENDPOINT: process.env.CHATGPT_ENDPOINT,
    CHATGPT_MODEL: process.env.CHATGPT_MODEL
}

module.exports = config
