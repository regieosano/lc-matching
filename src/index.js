import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import dotenv from 'dotenv'

dotenv.config();

try {
 
  const text = fs.readFileSync('./src/scrimba-info.txt', 'utf8')

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: [' ', '\n'],
    chunkOverlap: 50,
  })

  const output = await splitter.createDocuments([text])

  const sbApiKey = process.env.SUPABASE_API_KEY
  const sbUrl = process.env.SUPABASE_URL
  const openAIApiKey = process.env.OPENAI_API_KEY

  const client = createClient(sbUrl, sbApiKey)

  await SupabaseVectorStore.fromDocuments(
    output,
    new OpenAIEmbeddings({openAIApiKey}),
    {
      client,
      tableName: 'documents',
    }
  )

  console.log(output);
} catch (err) {
  console.log(err)
}