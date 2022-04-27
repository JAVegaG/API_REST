var express = require('express');
var app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


books = [
{
'id': 1,
'title': 'La hojarasca',
'description': 'Good one',
'author': 'Gabo'
},
{
'id': 2,
'title': 'El coronel no tiene quien le escriba',
'description': 'Interesting',
'author': 'Gabo'
}
]

var server = app.listen(5000, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})

app.get('/books', function (req, res) {
	data = JSON.stringify( { 'books': books }, null, ' ' );
	console.log( data );
	res.end( data ); 
})

app.get('/books/:id', function (req, res) {
	for (let book in books){
		if (books[book].id == req.params.id){
			aux = books[book]
			data = JSON.stringify( {'book': aux }, null, ' ' );
			console.log( data );
			res.end( data );
		}else{
			if (req.params.id > books.length){
				console.log( "404" );
				res.status(404).render();
				break;
				}	
			}
	}			         
})

app.post('/books', function (req, res) {
	body = req.body;	
	if (req.is("json")&&(body.title != null ) ){
		books.push(" ");
		if((body.description != null)&&(body.author !=null)){
			books[books.length-1]={
						'id':books.length,
						'title':body.title,
						'description':body.description,
						'author':body.author
						};
			}else{
				if(body.description!=null){
                        		books[books.length-1]={
                                        	        	'id':books.length,
                                                		'title':body.title,
                                                		'description':body.description,
                                                		'author':" "
                                               		 };
					}else{
						if(body.author!=null){
							books[books.length-1]={
                                                				'id':books.length,
                                                				'title':body.title,
                                                				'description':" ",
                                                				'author':body.author
                                                			};
							}
						}
					}
		aux = JSON.stringify({'book':books[books.length-1]},null,'');
		console.log(aux);
		res.status(201);
		res.send(aux);
	}else{
		console.log( "400" );
                res.status(400).render();	
	}
})

app.delete('/books/:id', function(req,res) {
						
        for (let book in books){
                if (books[book].id == req.params.id){
                        books.splice([book],1);
			console.log("OK");
			res.end("OK");
                }else{
                        if (req.params.id > books.length){
                                console.log( "404" );
                                res.status(404).render();
                                break;
                                }
                        }
        }
	for (let book in books){
		books[book]={
				'id':parseInt(book)+1,
				'title':books[book].title,
				'description':books[book].description,
				'author':books[book].author
			};
	}
})


app.put('/books/:id', function (req, res) {
        body = req.body;
        if (req.is("json")){
		for (let book in books){
                	if (books[book].id == req.params.id){
				if(body.title!=null){
                       			books[book].title = body.title;
					}
				if(body.description!=null){
					books[book].description = body.description;
					}
				if(body.author!=null){
					books[book].author = body.author;
					}
				aux = books[book];
                        	data = JSON.stringify( {'book': aux }, null, ' ' );
                        	console.log( data );
                        	res.end( data );
                	}else{
                        	if (req.params.id > books.length){
                                	console.log( "404" );
                                	res.end("404");
                                	break;
                                	}
                        	}
        		}
		}else{
                console.log( "400" );
                res.status(400).render();
        }
})
