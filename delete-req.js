const writeToFile = require("../util/write-to-file");


module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    // console.log(baseUrl);

    //spliting the url and finding the unique_id of each movie
    let id = req.url.split("/")[3];

    //regex to check for the unique id present in the url or not
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    // console.log(id);

    if(!regexV4.test(id)){ // if regex is invalid 
        res.writeHead(404, {"Content-Type": "application.json"});
        res.end(
            JSON.stringify({
                title:"Validation failed", 
                message: "UUID is not valid",
            })
        );
    }
    else if(baseUrl==="/api/movies/" && regexV4.test(id)){
        const index = req.movies.findIndex((movie) => {
            return movie.id === id;
        });
        if(index === -1){
            res.statusCode = 404;
            res.write(JSON.stringify({title: "Not Found", message:"Movie not found"}
            ));
            res.end();
        }
        else{
            req.movies.splice(index, 1); // take one record and remove it
            writeToFile(req.movies);
            res.writeHead(204, {"Content-Type":"application/json"});
            res.end(JSON.stringify(req.movies));
        }
    }
    else{
        res.writeHead(404, {"Content-Type": "application.json"});
        res.end(JSON.stringify({title:"Not found", message: "Page not found"}))
    }
}
