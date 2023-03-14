'use strict'

const debug = require('debug')
const { RequestHandler, ResponseHandler } = require('../bot_handler/index')
const Utils = require('../utils/utils')
const {copyes}= require('../copyes_handler/copyes')

const FallbackIntent = async (event, context, intentName) => {
    return CustomResponse_Close_Fulfilled(event, 'FallbackIntent', 'FallbackIntent', '0');
}

const CustomResponse_Close_Fulfilled = (event, copy, intentName, pivotPrompt) => {
    const intentState = 'Fulfilled', dialogAction = { type: 'Close' }, slots = RequestHandler.getSlotsIntent(event), confirmationState = RequestHandler.getConfirmationState(event), sessionAttributes = {}
    let msgContent = []
    switch (pivotPrompt) {
        case '0':
          
                msgContent = [
                    {
                        contentType: 'CustomPayload',
                        content: `<p>${copyes?.[copy]}</p>`
                    }
                ]

            break;
        default:
            msgContent = [
                {
                    contentType: 'CustomPayload',
                    content: `<p>${copyes[copy]}</p>`
                },
                {
                    contentType: 'CustomPayload',
                    content: `<p><a><img src="${images[copy]}" width="100%" height="85%"  style="float: none;"/></a></p>`
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
const Card_ElicitingSlot_inProgress = (event, intentName, slotName, buttonsCard) => {
    const intentState = 'InProgress',
        dialogAction = {
            slotToElicit: slotName,
            type: 'ElicitSlot'
        }, slots = RequestHandler.getSlotsIntent(event), confirmationState = RequestHandler.getConfirmationState(event), sessionAttributes = {}
    return ResponseHandler.CardResponse(dialogAction, confirmationState, intentName, intentState, 'Select an option', copyes[slotName], buttonsCard, sessionAttributes, slots)
}


module.exports = { FallbackIntent }
