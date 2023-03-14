'use strict'

const getIntentName = (event) => {
  return event.sessionState.intent.name
}

const getSlotsIntent = (event) => {
  return event.sessionState.intent?.slots
}

const getSessionAttributes = (event) => {
  return event.sessionState.sessionAttributes
}

const getConfirmationState = (event) => {
  return event.sessionState.intent.confirmationState
}

const getSlot = (event, slotName) => {
  return event.sessionState.intent.slots[slotName]
}

const getInputMode = (event) => {
  return event.sessionState.sessionAttributes.chanelType
}

const getSplitName = (event) => {
  return getIntentName(event).split("_");
}
const getExperienceName = (event) => {
  return getSplitName(event)[0]
}
const getFinalIntentName = (event) => {
  return getSplitName(event)[1]
}

const handlerOfsessionAttributes = (event, intentName = '', values = {}) => {
  const sessionAttributes = {}
  console.debug(values)
  if (RequestHandler.getSessionAttributes(event) === undefined) {
    sessionAttributes.previousIntent = intentName
  } else {
    const attrs = RequestHandler.getSessionAttributes(event)
    Object.entries(attrs).forEach(([key, value]) => {
      sessionAttributes[key] = value
    })
    sessionAttributes.previousIntent = intentName
  }
  if (values !== {}) {
    Object.entries(values).forEach(([key, value]) => {
      sessionAttributes[key] = value
    })
  }
  return sessionAttributes
}

module.exports = { getIntentName, getSessionAttributes, getSlotsIntent, getConfirmationState, getSlot, getInputMode, getFinalIntentName, getExperienceName ,handlerOfsessionAttributes}
