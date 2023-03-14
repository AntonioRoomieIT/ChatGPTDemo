'use strict'

const debug = require('debug')
const { RequestHandler, ResponseHandler } = require('../bot_handler/index')
const Utils = require('../utils/utils')
const {copyes}= require('../copyes_handler/copyes')

const hello = async (event, context, intentName) => {
    return CustomResponse_Close_Fulfilled(event, RequestHandler.getFinalIntentName(event), intentName, '0');
}
const help = async (event, context, intentName) => {
    return CustomResponse_Close_Fulfilled(event, RequestHandler.getFinalIntentName(event), intentName, '0');
}
const ilike = async (event, context, intentName) => {
    return CustomResponse_Close_Fulfilled(event, RequestHandler.getFinalIntentName(event), intentName, '1');
}
const idontlike = async (event, context, intentName) => {
    return CustomResponse_Close_Fulfilled(event, RequestHandler.getFinalIntentName(event), intentName, '1');
}
const goodbye = async (event, context, intentName) => {
    return CustomResponse_Close_Fulfilled(event, RequestHandler.getFinalIntentName(event), intentName, '0');
}
const thanks = async (event, context, intentName) => {
    return CustomResponse_Close_Fulfilled(event, RequestHandler.getFinalIntentName(event), intentName, '1');
}

const CustomResponse_Close_Fulfilled = (event, intent_nameSP, intentName, pivotPrompt) => {
    const intentState = 'Fulfilled', dialogAction = { type: 'Close' }, slots = RequestHandler.getSlotsIntent(event), confirmationState = RequestHandler.getConfirmationState(event), sessionAttributes = {}
    let msgContent = []
    switch (pivotPrompt) {
        case '0':
            msgContent = [
                {
                    contentType: 'CustomPayload',
                    content: `<p>${copyes?.[intent_nameSP]}</p>`
                }
            ]
            break;
        default:
            msgContent = [
                {
                    contentType: 'CustomPayload',
                    content: `<p>${copyes?.[intent_nameSP]}</p>`
                },
                {
                    contentType: 'CustomPayload',
                    content: `<p>${copyes?.pivot}</p>`
                }
            ]
            break;
    }
    return ResponseHandler.CustomPayloadResponse(dialogAction, confirmationState, intentName, intentState, msgContent, sessionAttributes, slots)
}



const handler = {}
handler.hello = hello
handler.help = help
handler.ilike = ilike
handler.idontlike = idontlike
handler.goodbye = goodbye
handler.thanks = thanks


const main = async (event, context, callback) => {
    const intentName = RequestHandler.getFinalIntentName(event)
    return handler[intentName](event, context, event?.sessionState?.intent?.name)
}
module.exports = { main }
