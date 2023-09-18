module.exports = (req, res) => {
    // take api/movies from the url
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    // console.log(baseUrl);

    //spliting the url and finding the unique_id of each movie
    let id = req.url.split("/")[3];

    //regex to check for the unique id present in the url or not
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    // console.log(id);

    if(req.url === "/api/movies"){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application.json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if(!regexV4.test(id)){ // if regex is invalid 
        res.writeHead(404, {"Content-Type": "application.json"});
        res.end(
            JSON.stringify({
                title:"Validation failed", 
                message: "UUID is not valid",
            })
        );
    }
    // if baseUrl is like "/test/movies/" than it will show page not found, i.e check baseUrl==="/api/movies/"
    else if(baseUrl==="/api/movies/" && regexV4.test(id)){ // for valid regex, we will filter out the movie with the uuid
        res.setHeader("Content-Type", "application.json");
        let filteredMovie = req.movies.filter((movie) =>{
            return movie.id === id;
        })
        if(filteredMovie.length > 0){ // if the length is > 0 than movie is present 
            res.statusCode = 200;
            res.write(JSON.stringify(filteredMovie));
            res.end();
        }
        else{ // if length==0 it means movie with uuid is not present
            res.statusCode = 404;
            res.write(JSON.stringify({title:"Not found", message: "Movie not found"}));
            res.end();
        }
    }
    else{
        res.writeHead(404, {"Content-Type": "application.json"});
        res.end(JSON.stringify({title:"Not found", message: "Page not found"}))
    }
};