


https://github.com/Talen-520/chatGPT-clone/assets/63370853/fc1e138f-cabe-4d82-bb40-2ba442dd1efe

# hints

edit .env with your openAI key

start backend by: npm run start:backend

frontend by:npm run start:frontend

adjust your model,token etc ... by:

body:JSON.stringify({
            model:"gpt-4",
            messages:[{role:"user",content:req.body.message}], // SENT TO OPENAI
            max_tokens:4000,
        })
# demo on netlify

https://gptproject.netlify.app/

my app run on local, please try by yourself
