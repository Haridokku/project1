const express = require("express")
const path = require("path")
const app = express();
const sqlite3 = require('sqlite3').verbose();

//app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database('my_database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create a table (if not exists)
db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
)`);

// Insert data into the table
const insertData = (name) => {
  const sql = `INSERT INTO todos(name) VALUES (?)`;
  db.run(sql,name, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Inserted ${name} into the database`);
    }
  });
};

// Query data from the table
const queryData = () => {
  db.all(`SELECT * FROM todos`, (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      rows.forEach((row) => {
        console.log(row.id, row.name);
      });
    }
  });
};

// Example usage
insertData('Alice');
insertData('Bob');
queryData();

// Close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Closed the SQLite database connection');
  }
});

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname,"public")))
const arr=[];

app.get("/home",(req,res) =>{
    res.render("index.ejs", {title: "template engine",value: Math.random()})
})

app.post('/addtask',(req, res) => {
    console.log(req.body.todoTask)
    arr.push(req.body.todoTask)
    res.render("index.ejs", {arr})
})

app.listen(3000,function(error){
    if(error) throw error
    console.log("Server created Successfully")
})
