//Our app relies on outside configuration settings like port numbers database links or secret keys stored in a .env file (process.env)

//By default, Node.js treats all environment variables simply as raw strings, and it doesn't care if they are missing or formatted completely wrong. If you have a typo in your configuration, your app might boot up fine but randomly crash 3 hours later when a user tries to hit a feature that relies on that broken variable.

//This file uses a popular library called Zod to catch those mistakes the exact second the server starts. If your configurations aren't perfect, it intentionally crashes the app immediately with a clear error message, saving you from hunting down silent bugs later.


import { z } from "zod"; // importing 'z' from zod liabrary. Zod is a tool that is used to create schemas(blueprints) to validate the data matches the exact, format, structure and type

const envSchema = z.object({ // defining our schema 'envSchema'.We are telling Zod: "We expect our environment configuration to be an object.

    PORT: z.string().optional() // PORT is a key. if it exists it must be a text string (z.string() or else its an optional '.optional'
})

function createEnv(env: NodeJS.ProcessEnv) { //We are creating a helper function called createEnv that takes your raw environment variables (process.env) as an input parameter.

    const safeParseResult = envSchema.safeParse(env) //here we are passing our raw enviornment data into zods 'safeParse()'. Zod compares the real data against the envSchema blueprint we built above (line-10) 

    if (!safeParseResult.success) throw new Error(safeParseResult.error.message);//We check if the validation failed (!safeParseResult.success). If the data didn't match our blueprint (for example, if someone accidentally passed an array or an object into PORT instead of a string), the code explicitly throws an error and shuts down the server instantly so you can fix it.

    return safeParseResult.data //if the validation succeeded ut returns the validated data.
}

export const env = createEnv(process.env) //We pass Node's global environment object (process.env) into our createEnv function. The validated output is saved into a variable named env, which is then exported (export).