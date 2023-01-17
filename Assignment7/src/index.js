const express = require('express')
const studentArray = require('./InitialData')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

//----------------------------------------------------------------------------------
app.get("/api/student", (req, res) => {

    res.json(studentArray);

})

//----------------------------------------------------------------------------------

app.get('/api/student/:id', (req, res) => {
    // console.log("id is ",req.params.id);

    const index = studentArray.findIndex(element => element.id == req.params.id);

    if (index >= 0) {

        const student = studentArray[index];

        res.status(200).json(student);
    }
    else {
    }
    res.status(404).json({
        status: "failed"
    })
})
//----------------------------------------------------------------------------
let new_id = studentArray.length + 1

app.post("/api/student", (req, res) => {

    const { name, currentClass, division } = req.body;

    if ( name && currentClass && division) {

        res.header({ 'content-type': 'application/x-www-form-urlencoded' });

        studentArray.push = { id: new_id, name: name, currentClass: currentClass, division: division }

        new_id++
        
        console.log(studentArray);

        res.json({ 'id': new_id })
    } else {
        res.status(400).json({
            status: "error"
        })
    }
})

//------------------------------------------------------------

app.put('/api/student/:id', (req, res) => {

    console.log(studentArray[req.params.id - 1]);

    console.log(req.body);

    const { name, currentClass, division } = req.body;

    if (name && currentClass && division && req.params.id < new_id) {


        studentArray.splice(req.params.id-1 ,1,req.body);
        

        res.json(studentArray)
    }else {
        res.status(400).json({
            status: "error"
        }) 
    }    
})

//--------------------------------------------------------

app.delete('/api/student/:id', (req, res) => {

    if (req.params.id < new_id) {

        studentArray.splice(req.params.id - 1,1);
        
        res.json(studentArray)
    }else {
        res.status(400).json({
            status: "error"
        }) 
    }    
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   