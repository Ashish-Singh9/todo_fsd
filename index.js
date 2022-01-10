const express = require('express')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT||8000

//for setting up ejs views folder
app.set("view engine", "ejs");

//for decoding POST req body and getting data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for making folder public for serving css and js file
app.use(express.static("public"));
//for using express session
app.use(session({
	secret: `${process.env.SECRET}`,
	resave: false,
	saveUninitialized: true,
  }))
  
/*to handle all routes make code easy to read
    routes
        routes.js  (controller
                        appReq.js
                        authReq.js)
*/
const routes=require('./routes/routes.js');
app.use("/",routes);


app.listen(PORT, () => {
	//console.log(`Example app listening at http://localhost:${PORT}`)
})