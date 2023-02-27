const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const lon = req.body.lon;
    const lat = req.body.lat;
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" +lat+"&lon=" +lon+ "&appid=1df20f7d7451b9ea5157a3f78ee1e8f5&units=metric";
    https.get(url,function(response){
console.log(response.statusCode);

response.on("data",function(data){
const weatherData = JSON.parse(data);
const temps = weatherData.main.temp;
const weatherDescription = weatherData.weather[0].description;
const icon =  weatherData.weather[0].icon;
const city = weatherData.name;
const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

res.write("<p>The weather is currently "+ weatherDescription+"</p>");
res.write("<h1>The Temperature in "+city+" is "+ temps+ " degree celsius</h1>");
res.write("<img src = "+ imageURL+ ">");
res.send();
});


});
});



app.listen(3000,function(){
console.log("running on 3000");
});