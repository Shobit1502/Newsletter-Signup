const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(express.static("public"))
const request=require('request');
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    console.log(firstName);

    mailchimp.setConfig({
        apiKey: "68e12cac81740e631dc53e99845a99e7-us7",
        server: "us7",
      });

      const run = async () => {
        try{
            const response = await mailchimp.lists.addListMember("760e26c54a", {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
                }
              });
            
            //   console.log(
            //     `Successfully added contact as an audience member. The contact's id is ${
            //       response.id
            //     }.`
            //   );
       
        console.log(response);
        res.sendFile(__dirname + "/success.html");  
        }catch(e){
          console.log(e);
          res.sendFile(__dirname + "/failure.html");  
        }
      };
      
       
      run();
})


app.post("/failure", (req,res)=>{
    res.redirect("/");
  });
app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server started on port 3000");
})
//68e12cac81740e631dc53e99845a99e7-us7