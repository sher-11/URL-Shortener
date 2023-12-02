import shortId from "shortid";
import connection from "../../app"
import jwt from "jsonwebtoken";
import { response } from "express";

// Home page
export const landing = (request, response) => {
    let findQuery = "SELECT * FROM urls"
    const result = connection.query(findQuery, (err,data) => {
    if(err) throw err
    response.render('landing', {shortUrls: data})
    })
}

//create database
export const create = (request, response) =>{
    let sql = "CREATE DATABASE NODEURL"
    connection.query(sql, (err, result) => {
        if(err) throw err;
        response.send("Database created")
    })
}

//create table
export const createTable =  (request, response) =>{
    let sql = "CREATE TABLE urls( originalURL VARCHAR(50), shortenedURL VARCHAR(20), token VARCHAR(500) ,PRIMARY KEY(originalURL))"
    connection.query(sql, (err, result) => {
        if(err) throw err;
        response.send("Table created")
    })
}

//API for url shortning with a table of orignal url, shortened url and token
export const urlShortener = async(req, res) => {
    try{
        let originalurlValue = req.body.originalurl
        let shorturl = shortId.generate();
        var token = jwt.sign({shortenedURL:shorturl}, "Secret", {expiresIn: '1h'})
        let post = {originalURL: originalurlValue, shortenedURL:shorturl, token:token }
        let input = `INSERT INTO urls SET ?`
        await connection.query(input, post, (err, data) => {
            if (err) throw err;
            res.redirect("/")
               
        })
    }catch(error){
        res.send("API failed to execute")
    }
}

//API for routing to the original url using shortened URL
export const shorturl =  (req,res) => {
    try{
    let shortUrlParam = JSON.stringify(req.params.shorturl)
    let sqlQuery = `SELECT * FROM urls WHERE shortenedURL = ${shortUrlParam}`;
    connection.query(sqlQuery, (err, data) => {
        if(err) throw err;
        else if (data == null){
            return res.sendStatus(400)
        }
        jwt.verify(data[0].token, 'Secret', function(err, decoded) {
            if (err) {
                res.sendStatus(400)
            }else{
        res.redirect(data[0].originalURL)
            }
        })
    })
    
}catch(error){
    res.send("API failed to execute")
    }
}
