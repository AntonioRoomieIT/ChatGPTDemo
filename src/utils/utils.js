'use strict'
const { RequestHandler, ResponseHandler } = require('../bot_handler/index')
const handlerOfsessionAttributes = (event, intentName = '', values = {}) => {
    const sessionAttributes = {}
    //debug(values)
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

 module.exports = { handlerOfsessionAttributes}