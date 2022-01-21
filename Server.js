var express = require("express")
var app = express()

app.use(express.json());

const PORT = 3000;

var users = [
    {
        login:'Admin',
        passwd:'Admin'
    },
    {
        login:'A',
        passwd:'A'
    },
    {
        login:'B',
        passwd:'B'
    },
    {
        login:'C',
        passwd:'C'
    },
    {
        login:'C2',
        passwd:'C2'
    },
    {
        login:'C3',
        passwd:'C3'
    },
    {
        login:'C4',
        passwd:'C4'
    },
    {
        login:'C5',
        passwd:'C5'
    },
];

function CheckUsers(x,y) {
    for (var i = 0; i < users.length; i++) {
        if (x == users[i].login && y==users[i].passwd) {
            return false;
        }
    }
    return true;
}

app.post("/SendRegister", function (req, res) {
    var user = req.body;
    
    if (CheckUsers(user.login,user.passwd)) {
        users.push(user);
        res.send("Tak");
    }
    else {
        res.send('Nie');
    }
  
    console.log(users)
})
app.post("/SendLogin", function (req, res) {
    var user = req.body;
    
    if (CheckUsers(user.login,user.passwd)) {
        res.send("Tak");
    }
    else {
        res.send('Nie');
    }
  
    console.log(users)
})

app.post("/GetUsers", function (req, res) {
    res.send(JSON.stringify(users));
})

app.post("/deleteUser", function (req, res) {
    console.log("Otrzymane: "+JSON.stringify(req.body))
    var user = req.body;
    for (let i = 0; i < users.length; i++) {
        if (user.login == users[i].login) {   
            users.splice(users.indexOf(users[i]),1)
            i = users.length;
            res.send(JSON.stringify(users));
        }
    }
})

app.get("/", function (req, res) {
    //console.log(req.body)
    res.send("GET")
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})