//create a http server and running on a port

import http from 'node:http' //here we are importing Nodes 'http' module

import { env } from './env.js' //here we are calling object named {env} from a local folder named env.js. This is where the code looks up configuration like what port number to use.

import { createServerApplication } from './app/index.js' //here we are importing a function 'createServerApplication' from app folder that holds the core logic of how the app actually process incoming web requests.


async function main() { //handle tasks that takes time to complete without freezing the entire server.

    try { //attempt to run the following code 

        const server = http.createServer(createServerApplication()) //here we are creating actual server instance using Node's 'http.createServer()' tool and pass our createServerApplication() that tells the system: 'everytime a user visits our server, let our app logic handle it'


        const PORT: number = env.PORT ? +env.PORT : 8080 //It uses a ternary operator to check: "Do we have a PORT defined in our env file?" 

        //If yes (?), convert it to a number using the + sign and use it.

        //If no (:), default to port 8080.


        server.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`) //it tells the server to start listening for incoming web traffic on specific PORT. The () =>{} is a callback function code that runs only after the server successfully fires up

        })
    } catch (error) { //safety net
        throw error

    }
}
main() //main function called