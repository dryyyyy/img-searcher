var express = require("express");
const PORT = process.env.PORT;
//google search
const CX = '004412081346264409078:pkmtbtz3ryu';
const API_KEY = 'AIzaSyDLI9jHKSqtMf8-8n7dBsdyeDo61KFBIik';
const google = require("google-search");
const googleSearch  = new google({
  key: API_KEY,
  cx: CX
});

var app = express();

var recentSearches = [];

function isEmpty(array){
    if (array == undefined){
        return true;
    } else {
        return false;
    }
}


app.get('/', function(req, res){
    res.redirect('/api/search/funny cats?offset=1');
});

app.get('/api/search/:query', function(req, res){
    var query = req.params.query;
    var offset = req.query.offset || 1;
    var fileTypeArr = ['jpg', 'jpeg', 'png', 'tiff', 'raw'];
    var currentSearch = {
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
        var outputArr = [];
        if(!isEmpty(response.items)){
            for (var i = 0; i < response.items.length; ++i){
                var outputObj = {
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