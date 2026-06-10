import express from "express";
import type { Application } from "express";

function createServerApplication(): Application {

    const app = express()
    return app

}