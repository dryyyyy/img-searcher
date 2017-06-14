# FreeCodeCamp API: Image Search Abstraction Layer

### User stories:

I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
I can paginate through the responses by adding a ?offset=2 parameter to the URL.
I can get a list of the most recently submitted search strings.

### Example query usage:

https://img-sal.herokuapp.com/lolcats%20funny?offset=10 <br/>
https://img-sal.herokuapp.com/latest

### Example query output:
```
[
{
url: "http://vignette3.wikia.nocookie.net/austinally/images/c/c1/Grumpy_cat_row.jpg/revision/latest?cb=20131124014953",
snippet: "File:Grumpy cat row.jpg. No higher resolution available. Grumpy_cat_row.jpg ( download) (620 × 400 pixels, file size: 35 KB, MIME type: image/jpeg). About; File ...",
thumbnail: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQGyh5mRXy27wuFUOaudzhpLuwVCqJmCrbysW9FTHolQjtcpqMRwKZMOy2B",
context: "http://austinally.wikia.com/wiki/File:Grumpy_cat_row.jpg"
},
{
url: "http://vignette2.wikia.nocookie.net/h__/images/b/b1/Cat_costume_5.jpg/revision/latest?cb=20141102031513&path-prefix=halloween",
snippet: "File:Cat costume 5.jpg ... A cat costume is a very popular costume for Halloween because as you might ... Tiger costume; Tiger-fairy costume; Grumpy Cat mask.",
thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHyb9j0kKOFIeM1LAp_OWNYkgGxm-L_FRR2GTMrgjnbgvxZojgXz8-K5s9",
context: "http://halloween.wikia.com/wiki/File:Cat_costume_5.jpg"
},
{
url: "http://vignette4.wikia.nocookie.net/austinally/images/d/d3/Grumpy_cat_circle.jpg/revision/latest?cb=20131124014915",
snippet: "File:Grumpy cat circle.jpg. No higher resolution available. Grumpy_cat_circle.jpg (download) (400 × 236 pixels, file size: 16 KB, MIME type: image/jpeg).",
thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQs6ftPrMWkcQQxECFoOmp449F0PgnsrSqxp9HxvQkbBNSRkQrqieLoYt8",
context: "http://austinally.wikia.com/wiki/File:Grumpy_cat_circle.jpg"
}
]
```
### Example latest output:
```
[
{
term: "grumpy cat",
when: "2017-06-14T08:29:34.194Z"
}
]
```