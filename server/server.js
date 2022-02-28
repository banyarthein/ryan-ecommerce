const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require("fs"); //file system

require('dotenv').config();

//import routes
//const authRoutes = require("./routes/auth")


//app
const app = express();

//db
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: true
    })
    .then()
    .catch(err => { console.log(`DB Connection ERR: ${err.message}`) });

//middleware 
app.use(morgan("dev"));
//app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));

app.use(cors());

//routes middleware
//app.use("/api", authRoutes);

//routes adding from a directory
readdirSync("./routes").map((r) => {
    app.use("/api", require("./routes/" + r))
})


//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));