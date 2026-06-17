import {Router} from 'express' //We are importing the Router mini-application from the Express


import TodoController from './controller.js'//We are importing the TodoController class. This is the file that contains our actual data-handling logic.

const router = Router()

const controller = new TodoController

router.get('/', controller.handleGetAllTodos.bind(controller))

router.post('/', controller.handleInsertTodo.bind(controller))

export default router