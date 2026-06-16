//create a http server and running on a port

import http from 'node:http' //here we are importing Nodes 'http' module

import { env } from './env.js' //here we are calling object named {env} from a local folder named env.js. This is where the code looks up configuration like what port number to use.

import { createServerApplication } from './app/index.js' //here we are importing a function 'createServerApplication' from app folder that holds the core logic of how the app actually process incoming web requests.


async function main(){ //handle tasks that takes time to complete without freezing the entire server.

    try { //attempt to run the following code 
        
        const server = http.createServer(createServerApplication())
        const PORT: number = env.PORT ? +env.PORT: 8080

        server.listen(PORT, () =>{
            console.log(`Server is running on PORT ${PORT}`)
        })
    } catch (error) { //safety net
        throw error
        
    }
}
main()