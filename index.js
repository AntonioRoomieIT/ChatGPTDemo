'use strict'
const debug = require('debug')
const IntentsHandler = require('./src/intent_handler/index')
const FallbackHandler = require('./src/fallback_handler/index')
const { RequestHandler, ResponseHandler } = require('./src/bot_handler/index')
// const { KendraHandler, buildKendraResponse } = require('./src/kendra_hanlder/index')
const { ChatGPTHandler,buildChatGPTResponse } = require('./src/chatgpt_handler/index')


exports.handler = async (event, context, callback) => {
    console.debug("-----------EVENT----------")
    console.debug(JSON.stringify(event));
    console.debug("-----------EVENT----------")
    const experienceName = RequestHandler.getExperienceName(event),
        intentName = RequestHandler.getFinalIntentName(event),
        originalIntentName = RequestHandler.getIntentName(event);
    switch (originalIntentName) {
        case 'FallbackIntent':
            let ChatGPTResult= await ChatGPTHandler(event, event.inputTranscript);
            return ChatGPTResult === '0' ? await FallbackHandler.FallbackIntent(event, context, callback) : await buildChatGPTResponse(event, ChatGPTResult);
            break;
        default:
            const response = await IntentsHandler[experienceName].main(event, context, callback)
            console.debug('-----------RESPONSE----------');
            console.debug(JSON.stringify(response));
            console.debug('-----------RESPONSE----------');
            return response;
            break;
    }
}