'use strict'
const debug = require('debug')

const PlainTextResponse = (dialogAction = { typeDialog: 'Close' }, confirmationState = 'Confirmed', intentName, intentState, msgContent = [{ contentType: 'PlainText', value: 'Disculpa, ¿podrias repetirme lo ultimo por favor?' }], sessionAttributesV = {}, slots = {}) => {
    const response =
    {
        sessionState: {
            dialogAction,
            intent: {
                name: intentName,
                slots,
                confirmationState,
                state: intentState
            },

            sessionAttributes: sessionAttributesV
        },
        messages: msgContent
    }
    return response
}
const CardResponse = (dialogActionR = { type: 'ElicitSlot' }, confirmationSt = 'Confirmed', intentName, fullFillmentState, titlec, subtitlec, buttonsCard = [{ text: 'Default', value: 'DefaultValue' }], sessionAttributesV, slots = {}) => {
   
  const response = {
    sessionState: {
      dialogAction: dialogActionR,
      intent: {
        confirmationState: confirmationSt,
        name: intentName,
        state: fullFillmentState,
        slots
      },
      sessionAttributes: sessionAttributesV
    },
    messages: [
      {
        contentType: 'ImageResponseCard',
        imageResponseCard: {
          title: titlec,
          subtitle: subtitlec,
          buttons: buttonsCard
        }
      }
    ]
  }
  return response
}
const CustomPayloadResponse = (dialogAction = { typeDialog: 'Close' }, confirmationState = 'Confirmed', intentName, intentState, msgContent, sessionAttributesV = {}, slots = {}) => {
    const response =
    {
        sessionState: {
            dialogAction,
            intent: {
                name: intentName,
                slots,
                confirmationState,
                state: intentState
            },

            sessionAttributes: sessionAttributesV
        },
        messages: msgContent
    }
    return response
}



module.exports = { PlainTextResponse, CardResponse,CustomPayloadResponse }