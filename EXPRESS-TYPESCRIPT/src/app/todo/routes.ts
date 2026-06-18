import {Router} from 'express' //We are importing the Router mini-application from the Express


import TodoController from './controller.js'//We are importing the TodoController class. This is the file that contains our actual data-handling logic.

const router = Router() //we will attach our URL endpoints directly to our router object.

const controller = new TodoController //Because 'TodoController' was exported as a class template, we must create a live instance of it using the new keyword. This fires up its internal constructor and sets up our empty array database (this._db = []) inside the server memory.

router.get('/', controller.handleGetAllTodos.bind(controller)) //This sets up a Read endpoint. We are telling Express: "If a user sends an HTTP GET request to the base URL (/), send them to the controller's handleGetAllTodos function."

//Why .bind(controller)? This is a crucial JavaScript rule. When you hand a class function over to Express, it loses track of its parent object. If we didn't add .bind(controller), the function wouldn't be able to find this._db and would crash. Binding keeps the function safely locked to our live controller instance.

router.post('/', controller.handleInsertTodo.bind(controller))//This sets up a Create endpoint. We are telling Express: "If a user sends an HTTP POST request containing a body payload to the base URL (/), run the controller's asynchronous handleInsertTodo function.

export default router