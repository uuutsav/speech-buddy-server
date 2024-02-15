const express = require('express');
const app = express();
const port = 5000;

app.get("/api", (req, resp)=> {
    resp.json({
        "inData": ['a', 'b']
    });
})

app.listen(port, () => {
    console.log("Server started at port: " + port);
});