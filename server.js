'use strict'
require('dotenv').config()


const express = require("express");
const PORT = process.env.PORT;
//google search
const CX = process.env.CX;
const API_KEY = process.env.API_KEY;
const google = require("google-search");
const googleSearch  = new google({
  key: API_KEY,
  cx: CX
});

let app = express();

let recentSearches = [];


app.get('/', function(req, res){
    res.redirect('/api/search/funny cats?offset=1');
});

app.get('/api/search/:query', function(req, res){
    let query = req.params.query;
    let offset = req.query.offset || 1;
    let fileTypeArr = ['jpg', 'jpeg', 'png', 'tiff', 'raw'];
    let currentSearch = {
        term: req.params.query,
        when: new Date().toLocaleString()
    };
    googleSearch.build({
        q: query,
        start: offset,
        fileType: fileTypeArr,
        num: 10
    }, function (error, response){
        if (error) throw error;
        let outputArr = [];
        if(response.items){
            for (let i = 0; i < response.items.length; ++i){
                let outputObj = {
                    url: response.items[i].pagemap.cse_image[0].src,
                    snippet: response.items[i].snippet,
                    thumbnail: response.items[i].pagemap.cse_thumbnail[0].src,
                    context: response.items[i].link
                };
            outputArr.push(outputObj);
            }
            res.send(outputArr);
        } else {
            res.send('No matches found');
        }
        recentSearches.push(currentSearch);
    });
});

app.get('/api/latest', function (req, res){
    res.send(recentSearches);
});

app.listen(PORT, function(){
    console.log('imgSearcher is listening on port: ' + PORT);
});