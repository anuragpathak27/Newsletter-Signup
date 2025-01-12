const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

    const firstName = req.body.fName; 
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/5ffc0a789b";

    const options ={
        method: "POST",
        auth : "Anurag:7061e9f57bc9ec4589135e67e27f9df6-us12",
    }
 
    const request = https.request(url,options,function(response){

   if (response.statusCode == 200){
    res.sendFile(__dirname+"/success.html");
   }
   else{
    res.sendFile(__dirname+"/failure.html");
   }

      response.on("data",function(data){
        console.log(JSON.parse(data));
      });
});
    
    request.write(jsonData);
    request.end();
    // console.log(firstName, lastName , email);

});


app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 5000,function(){
    console.log("server is runningg on port 5000");
});


// API Key
// 7061e9f57bc9ec4589135e67e27f9df6-us12

// List id
// 5ffc0a789b
