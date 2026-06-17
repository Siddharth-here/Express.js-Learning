
import type { Request, Response } from 'express' // TypeScript definitions for Request and Response from Express that gives auto complete features for web traffic requests and replies.

import { todoValidationSchema, type Todo } from "../../validation/todo.schema.js"; //grabbing zod schema blueprint and type Todo

class TodoController { //declaring a class named 'TodoController'

    private _db: Todo[] //private variable called '_db'
    // The Todo[] syntax means this variable is an Array that is allowed only to hold items matching your strict Todo structure. 
    
    //This acts as our temporary database stored in the server's memory

    constructor() {
        this._db = []
    } //The constructor runs automatically when this controller is turned on. It initializes this._db as an empty array ([]), ready to hold tasks.

    public handleGetAllTodos(req: Request, res: Response) { //This function handles requests from users who want to read their to-do list.

        const todos = this._db // 'todos' takes all the items currently sitting inside our fake database array (this._db).

        return res.json({ todos })//sends to users web app as a clean JSON package(res.json).
    }
    
    //function for adding a new item
    public async handleInsertTodo(req: Request, res:Response){
        try {
            const unvalidated = req.body //when a user create a new task their input arrives inside 'req.body'. it is unverified data

        const validationResult = await todoValidationSchema.parseAsync(unvalidated) //We pass that raw unvalidated data into our Zod schema's parseAsync() engine. Zod will double-check everything: Does it have an ID string? Is the title correct? If the data is missing pieces or malformed, Zod will immediately raise an error and jump straight down to the catch block.

        this._db.push(validationResult)//clean data (validationResult) is safely pushed into our array database.

        return res.status(201).json({todo: validationResult})//HTTP status code of 201 (which means "Successfully Created")
        } catch (error) {
            return res.status(500).json({ error: 'validation failed'})
        }
    }
}

export default TodoController