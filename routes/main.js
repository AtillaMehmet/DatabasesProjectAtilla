module.exports = function(app, SiteData) {

    // Handle our routes
    app.get('/',function(req,res){
         res.render('index.ejs', SiteData)
    });
    app.get('/about',function(req,res){
         res.render('about.ejs', SiteData);
    });
    app.get('/search',function(req,res){
         res.render("search.ejs", SiteData);
    });
    app.get('/search-result', function (req,res){
   // Searching in the database
       let sqlquery =
       "SELECT * from books WHERE name like '%" + req.query.keyword + "%'";
       db.query(sqlquery,(err, result) => {
       if (err) {
           res.send("Error");
       }
       let newData = Object.assign({}, SiteData, {availableBooks:result});
       console.log(newData)
       res.render("search~result.ejs", newData)
       });
   });
   
    app.get('/list', function(req, res){
       let sqlquery = "SELECT * FROM books";
   //query database to get all the books
   //execute sql query
   db.query(sqlquery, (err,result) => {
       if(err){
           res.redirect('./');
           }
       let newData = Object.assign({}, SiteData, {availableBooks:result});
       console.log(newData)
       res.render("list.ejs", newData)
           });
       });
   
   app.get('/register', function (req,res) {
        res.render('register.ejs', SiteData);
       });
   
   app.get('/addbook', function(req,res){
       res.render('addbook.ejs', SiteData)
   });
   app.post('/bookadded', function (req,res){
   //saving data in database
       let sqlquery= "INSERT INTO books (name, price) VALUES (?,?)";
   //execute sql query
       let newrecord = [req.body.name, req.body.price];
       db.query(sqlquery, newrecord, (err,result) => {
       if(err){
         return console.error(err.message);
       }
       else
       res.send(' This book is added to database, name: '+ req.body.name + ' price '+ req.body.price);
           });
       });
   //execute sql query
   app.get('/bargainbooks', function(req,res){
       let sqlquery = "SELECT * FROM books WHERE price <=20";
   //code above selects all books from the database where the price is less than 20
   //execute sql query
       db.query(sqlquery, (err,result) => {
       if(err){
           res.redirect('./');
           }
           let newData = Object.assign({}, shopData, {availableBooks:result});
           console.log(newData)
           res.render("bargainbooks.ejs", newData)
       });
   });
   
    app.post('/registered', function (req,res) {
    // saving data in database
    res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);
       });
   }
   