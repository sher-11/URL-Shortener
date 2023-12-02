import express from "express"
let router = express();
import {landing, create, createTable, urlShortener, shorturl} from "../controller/index"

router.get("/", landing);
router.get("/create", create)
router.get("/create-task", createTable)
router.post("/url-shortener", urlShortener)
router.get("/:shorturl", shorturl)

export default router;