'use strict'
require('dotenv').config()


const express = require("express");

//mongoDB
const mongo = require("mongodb").MongoClient
const url = 'mongodb://' + process.env.IP + ':27017/queryLog'
console.log(process.env.IP);

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

app.get('/api/search', function(req, res) {
    res.send('Type in your query after /api/search');
});

app.get('/api/search/:query', function(req, res){
    let query = req.params.query;
    let offset = req.query.offset || 1;
    let currentSearch = {
        term: query,
        when: new Date().toLocaleString()
    };
    //placing the current query in the search log
    mongo.connect(url, function(err, db){
        if (err) throw err;
        
        var recentQueries = db.collection('recentQueries');
        recentQueries.insert(currentSearch, function (err, data){
            if (err) throw err;
            db.close();
        });
    });
    
    
    googleSearch.build({
        q: query,
        start: offset,
        num: 10
    }, function (error, response){
        if (error) throw error;
        let outputArr = [];
        if(response.items){
            for (let i = 0; i < response.items.length; ++i){
                if (response.items[i].pagemap.cse_image){
                    let outputObj = {
                        url: response.items[i].pagemap.cse_image[0].src,
                        snippet: response.items[i].snippet,
                        context: response.items[i].link
                    };
                     if (response.items[i].pagemap.cse_thumbnail){
                        outputObj.thumbnail = response.items[i].pagemap.cse_thumbnail[0].src;
                    } else {
                        outputObj.thumbnail = 'N/A';
                    }
                    outputArr.push(outputObj);
                    
                }
            }
            res.send(outputArr);
        } else {
            res.send('No matches found');
        }
        recentSearches.push(currentSearch);
    });
});

app.get('/api/latest', function (req, res){
    //getting the log list from db and showing on screen
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        let recentQueries = db.collection('recentQueries');
        recentQueries.find({},{_id: 0}).sort({when: -1}).toArray(function (err, docs){
            if (err) throw err;
            res.send(docs);
        });
        db.close();
    });
    
});

app.listen(PORT, function(){
    console.log('imgSearcher is listening on port: ' + PORT);
});