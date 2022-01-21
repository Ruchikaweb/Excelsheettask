var express = require('express')
var app = express()
var port = process.env.PORT ||5000;
const mongoose = require('mongoose')
// var mongo = require("mongodb");
// var MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
var mongourl="mongodb+srv://ruchikaa:ruchika123@websites.djtcx.mongodb.net/Excelsheetprogram?retryWrites=true&w=majority"
var db;
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


const userSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: true,
    unique: [true ,"Sno alreadt present"]
  },
  name:{
      type: String,
      required: true
  },
  DOB:{
      type: Date,
      required: true
  },
  mobileno:{
    type: Number,
    required: true,
    min:10,
    unique: [true ,"Mobileno alreadt present"]
  },
  Adharcardno:{
    type: Number,
    required: true,
    min:12,
    unique: [true ,"Email id alreadt present"]
  }
});
// const User = mongoose.model('User', userSchema);

//collection creation
const Userdetails = new mongoose.model("Customers" ,userSchema );

///insert value///
// const insertdetails = async () => {
//     try{
//         const Details = new Userdetails({
//             sno: 2,
//             name:"Ruchika",
//             DOB:12-2-2000,
//             mobileno: 1212121213,
//             Adharcardno:121212121214,
//         })
        
//          const res = await Details.save()
//          console.log(res) ;
//     }catch(err){
//         console.log(err)
//     }
   
// }

// insertdetails();


 
//health Check
app.get('/',(req,res) => {
    res.send("Health Ok");
});

//get All customer List
app.get('/customers', async(req,res) => {
    
    try{
        const data = await Userdetails.find();
        res.send(data)
    }catch(e){
        res.send(e)
    }
})

//post Customer details api //
app.post('/post_details',(req,res)=>{
 console.log(req.body)
    const users = new Userdetails(req.body)
    users.save().then(() => {
        res.send(users);
    }).catch((e) => {
        res.send(e);
    })
});     
  

//connection with mongo serer

mongoose.connect(mongourl,{
   useNewUrlParser: true
//     useCreateIndex : true,
//    useFindAndModify : true,
//    useUnifiesTopology: true
}).then( ()=> console.log("connection successful"))

.catch((err) => console.log(err));

// MongoClient.connect(mongourl, (err, connection) => {
//     if (err) throw err;
//     db = connection.db('Excelsheetprogram')
// })

app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})
