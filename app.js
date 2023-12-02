import express from 'express';
import mysql from "mysql";
import bodyParser from 'body-parser';
import config from "./config/config"
import route from "./api/routes/index"
let app = express();

let connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});
  
connection.connect((err, data) => {
    if (err) {
      console.error('error connecting:'+ err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
});

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",route);


app.listen(config.port, function (err) {
	if (err) throw err;
	console.log("Server is Running");
});

export default connection;