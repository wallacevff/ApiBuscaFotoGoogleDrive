import express from "express";
import dotenv from "dotenv";
dotenv.config({path: ".env"});
import { Router } from "./Router";
import {app} from "./app";

new Router(app);