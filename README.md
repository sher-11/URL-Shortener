Welcome to URL Shortening service.
Please follow few simple steps to run the service.

Always check on your mac "system preferences" that mysql is running and always click on "start MYSQL server" to keep your MYSQL server up and running.

Settings for the database:
I have used MySql database here and to furthur go ahead with that keep few things in mind like. Download mysql and MYSQL workbench locally on  your system.
1. There should be a connection created with a username and password.
That username and password will be required in the config/config.js file, creating a key value pair in the for thr user : "username", and password : "connection password"
2. Once the connection is set up the database will be connected and now create a new databse by either using the MYSQL workbench or by using the localhost/create api. 
3. Once a database is created, also enter the database name into config/config.js in the "database" : "NODEURL" then create a table in the in the created database. In my code it is "urls"

this sets up the databse for us.

Moving on to starting the application.
1. Install all the dependencies using npm install.
2. Run the application using "npm start" command in the terminal and go to localhost:8080. You will be routed to the home page of the application that is the url shortener page.
3. Enter a valid url which you want to shorten and then click "shrink" button. This is craete an entry of the original url and the shortened url in the table below the input field.
4. Now click on the shortened url under the Shortened url column and you will be routed to the original url.

NOTE:: Default settings:
For testing purpose I prefer you going with the defalt settings that I have set through the codebase
1. database name: NODEURL
2. table name : urls
3. user: root
4. password: password
4. port : 8080

Now you can make any number of urls for which you want to create a shorter URL.

For the URL expiration, a token is genrated everytime when a new url is submitted, here in the apllication the default expiry time of the an URL is set to 1 hour.

