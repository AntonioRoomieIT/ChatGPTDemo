'use strict'
const { RequestHandler, ResponseHandler } = require('../bot_handler/index')
const Utils = require('../utils/utils')
const { CHATGPT_APIKEY, CHATGPT_MODEL } = require('../config');
const { copyes } = require('../copyes_handler/copyes')
const { Configuration, OpenAIApi } = require("openai");


const ChatGPTHandler = async function (event, query) {
    const configuration = new Configuration({
        apiKey: CHATGPT_APIKEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
        const ChatGPTResult = await openai.createCompletion({
            model: CHATGPT_MODEL,
            prompt: event?.inputTranscript,
            max_tokens: 4000,
            temperature: 0,
            stream: true,
        }, { responseType: 'stream' });
        let msg = '';
        const finalResponse = new Promise((resolve, reject) => {
            ChatGPTResult.data.on('data', data => {
                const lines = data.toString().split('\n').filter(line => line.trim() !== '');
                for (const line of lines) {
                    const message = line.replace(/^data: /, '');
                    if (message === '[DONE]') {
                        resolve(msg.trim())
                    } else {
                        try {
                            const parsed = JSON.parse(message);
                            msg = msg + parsed.choices[0].text;
                        } catch (error) {
                            console.error('Could not JSON parse stream message', message, error);
                        }
                    }
                }
            });
        });
        return finalResponse.then((finalResponseCleaned) => {
            return finalResponseCleaned;
          });
    } catch (error) {
        if (error.response?.status) {
            console.error(error.response.status, error.message);
            error.response.data.on('data', data => {
                const message = data.toString();
                try {
                    const parsed = JSON.parse(message);
                    console.error('An error occurred during OpenAI request: ', parsed);
                } catch (error) {
                    console.error('An error occurred during OpenAI request: ', message);
                }
            });
        } else {
            console.error('An error occurred during OpenAI request', error);
        }
    }

};
const buildChatGPTResponse = function (event, _response_) {
    const intentState = 'Fulfilled', inputMode = RequestHandler.getInputMode(event), dialogAction = { type: 'Close' }, slots = RequestHandler.getSlotsIntent(event), confirmationState = RequestHandler.getConfirmationState(event)
    let intentName = RequestHandler.getIntentName(event), sessionAttributes = Utils.handlerOfsessionAttributes(event, intentName)
    let msgContent = []

    if (sessionAttributes?.URL != undefined) {
        msgContent = [
            {
                contentType: 'CustomPayload',
                content: `<p>${_response_}</p>`
            },
            {
                contentType: 'CustomPayload',
                content: `<a href="${sessionAttributes?.URL}" target="_blank" style=\" margin-bottom: -15px; color: tomato; text-decoration: solid; display: block; text-align: center; \">For more information, Click me!</a>`
            },
            {
                contentType: 'CustomPayload',
                content: `<p>${copyes.pivot}</p>`
            }
        ]
    } else {
        msgContent = [
            {
                contentType: 'CustomPayload',
                content: `<p>${_response_}</p>`
            },
            {
                contentType: 'CustomPayload',
                content: `<p>${copyes.pivot}</p>`
            }
        ]
    }

    return ResponseHandler.CustomPayloadResponse(dialogAction, confirmationState, intentName, intentState, msgContent, sessionAttributes, slots)
}

module.exports = { ChatGPTHandler, buildChatGPTResponse }