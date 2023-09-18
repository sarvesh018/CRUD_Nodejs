const http = require("http");

const getReq = require("./methods/get-req");
const postReq = require("./methods/post-req");
const putReq = require("./methods/put-req");
const deleteReq = require("./methods/delete-req");

let movies = require("./data/movies.json");

const port = process.env.port || 5001;

const server = http.createServer((req, res) => {
    req.movies = movies;

    switch(req.method){
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({title:"Not found", message: "Node js project"}));
            res.end();
    }
    
});

server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});