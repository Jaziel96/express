const express = requiere ("express");
const app = express();
const port = 3000;


let users = [
    {name: "Jaziel", email: "jazcov96@hotmail.com"}
    {name: "isai", email: "jazcov96@gmail.com"}
]

app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.get("/users/id:", (req, res) => {
    const userId = Number (re.params.id);
    const user = users.find((user)=> user.id === userId);
    
    res.status(200).json(user|| {});

});




app.get("/",(req, res) => {
    res.send("Hello World");
});

app.post("users", (req,res)=> {
    const {name, email} =req.body;
    const id = users.length;
    const user = {id, name, email};

    users.push(user);
    res.status(201).json(user);
});

app.listen(port,() => {
    console.log(`The blogger bckend is running at localhost:${port=3000}`)
})

app.put();
app.delete();
app.get();
