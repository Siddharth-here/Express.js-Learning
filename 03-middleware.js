const express = require('express')


function block_1_httpMethods(){
    return new Promise((resolve) => {
        const app = express()

        const logs = []
        app.use(express.json()) //app.use = middleware

        //request logger

        app.use((req, res, next) => {
            //buisness logic
            // . console log everything
            // . add to db

            const logEntry = `${req.method} : ${req.url}`

            logs.push(logEntry)

            //if your request hangs forever
            next()
        })

        //time tracker that shows when the request came and how much time taken to process

        app.use((req, res, next)=> {
            req.startTime = Date.now()

            res.on('finish', () => {
                const duration = Date.now() - req.startTime

                console.log(`${req.method} - ${req.url} took ${duration}ms`);
                
            })

            next()
        })

        //custom middleware

        function authMe(req, res, next) {

            const token = req.headers['x-auth-token']

            if(!token){
                return res.status(401).json({"error": "No token, please login"})
            }

            if(token !== "secret"){
                return res.status(403).json({error: "invalid token"})
            }
            
            // token - extract data from token -> userID, email

            req.user = {id: 1, name: "sidd", role: "admin"}

            next()
        }

        function getRole (role) {
            return (req, res, next) => {
                if(!req.user || req.user.role !== role){
                    return res.status(403).json({error: `Role ${role} required`})
                }
            }
            next()
        }

        app.get('/profile', authMe, getRole(['admin', 'teacher', 'student']), (req, res) => {
        res.send("Welcome to your profile!");
        

        //Rate limiting
        function rateLimit(maxRequest){
            let count = 0

            return (req, res, next) => {
                count++

                if (count > maxRequest) {

                    return res.status(429).json({error: " too many request, try later"})
                }

                next()
            }
        }

        const limitedEndpoint = rateLimit(3)

        app.get('/limited', limitedEndpoint, (req, res) => {})


 

        



        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`;

            try {
                //TODO
                const listRes = await fetch(`${base}/routes`)
                const listData = await listRes.json()

                const createRes = await fetch(`${base}/routes`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        body: JSON.stringify({
                            name: "Colaba-Worli",
                            direction: "South"
                        })
                    }
                })
                const created = await createRes.json()

                
            } catch (error) {
                console.log(error)
            }

            server.close(() => {
                console.log("Block 1 served....")
                resolve()
            })


        })


    })
}


function block_1_httpMethods(){
    return new Promise((resolve) => {
        const app = express()
        app.use(express.json())
// /files/docs/readme.txt
// /files/assets/style.css
        app.get('/files/*filepath', (req, res) => {
            const filepath = req.params.filepath
            res.json({filepath, type: "wildcard"})
        })

        app
            .route("/schedule")
            .get((req, res) => {})
            .post((req, res) => {})
            .put((req, res) => {})
            .delete((req, res) => {})

        app.use("/api", (req, res) => {
            //its a prefetch match
        })



        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`;

            try {
                //TODO
                

                
            } catch (error) {
                console.log(error)
            }

            server.close(() => {
                console.log("Block 1 served....")
                resolve()
            })


        })


    })
}

async function main(){
    await block_1_httpMethods()


    process.exit(0)
}

main()