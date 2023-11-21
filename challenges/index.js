import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PromptTemplate } from 'langchain/prompts'
import dotenv from 'dotenv'

dotenv.config();

const openAIApiKey = process.env.OPENAI_API_KEY

const llm = new ChatOpenAI({ openAIApiKey })

const standAloneQuestionTemplate = 'Please provide me the standalone question, based on this provided question {givenQuestion}'

const standAloneQuestionPrompt = PromptTemplate.fromTemplate(standAloneQuestionTemplate)

const standAloneQuestionChain = standAloneQuestionPrompt.pipe(llm)

const response = await standAloneQuestionChain.invoke({givenQuestion: 'I am getting fat now because I have been eating a lot lately. Where can I find a gym. Or else I might get sick of being overweight'}) 

console.log(response.content)