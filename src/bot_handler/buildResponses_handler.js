'use strict'

const debug = require('debug')
const { RequestHandler, ResponseHandler } = require('../bot_handler/index')
const Utils = require('../utils/utils')
const {copyes,images}=require('../copyes_handler/copyes')


const CustomResponse_Close_Fulfilled = (event, copy, intentName, pivotPrompt) => {
    const intentState = 'Fulfilled', dialogAction = { type: 'Close' }, slots = RequestHandler.getSlotsIntent(event), confirmationState = RequestHandler.getConfirmationState(event), sessionAttributes = {}
    let msgContent = []
    switch (pivotPrompt) {
        case '0':
            if (intentName === 'FallbackIntent'||intentName === 'general_hello') {
                let options = [
                    { text: 'Who is Emiliano Zapata?', value: 'Who is Emiliano Zapata?' },
                    { text: 'What is the Diana Cazadora?', value: 'What is the Diana Cazadora?' },
                    { text: 'When was Mexican Revolution?', value: 'When was Mexican Revolution?' },
                    { text: 'Why did Mexican sacrifice people?', value: 'Why did Mexican sacrifice people?' },
                    { text: 'What colors does the Mexican flag have?', value: 'What colors does the Mexican flag have?' }
                ];
                msgContent = [
                    {
                        contentType: 'CustomPayload',
                        content: `<p>${copyes[copy]}</p>`
                    },
                    {
                        contentType: 'ImageResponseCard',
                        imageResponseCard: {
                            title: 'Select one',
                            subtitle: 'You can ask questions like:',
                            buttons: options
                        }
                    }
                ]
            } else {
                msgContent = [
                    {
                        contentType: 'CustomPayload',
                        content: `<p>${copyes[copy]}</p>`
                    }
                ]
            }
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

module.exports = {  CustomResponse_Close_Fulfilled, Card_ElicitingSlot_inProgress }