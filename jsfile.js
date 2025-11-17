require("dotenv").config({path: "private.env"}); //we add this for importing the variables from private.env file and store them in process.env
const mongoose = require("mongoose"); //importing mongoose library
const uri = process.env.Mongo_uri; //we can take our data from process.env
    mongoose.connect(uri) //connecting mongodb db to nodejs
    .then(()=>console.log("connection done"))
    .catch((error)=>console.error("there is some issues in connection ",error))
const {Schema} = mongoose; //destructing the Schema property from mongoose library 
const my_schema = new Schema({ //defining new schema
    age : {type : Number, required : true},
    name : {type : String, required : true, unique : true},
    favoritfood : [String],
    _id : {type : Number,required:true}
})
const person = mongoose.model("Person",my_schema); //create the collection in the db if there is no collection named people if there is it won't create a new it will work with the existing one 
const globale = async () => { 
     async function asyncfunc(){
        await person.deleteMany({})
        const person1 = new person({_id : 0 ,age:19,name: "ilyassse",favoritfood:["pizza","tacos","cosamia"]});
        try {
            await person1.save();  
            console.log("saved successfully")
        }
        catch(err){
            console.error("error in saving :",err)
        }
        await person.create([
        { _id: 1,  name: "hanane", age: 42, favoritfood: ["cosamia","tacos","sefa"] },
        { _id: 2,  name: "hajjaj", age: 50, favoritfood: ["kssksso","reffisa","tajine","tanjiya"] },
        { _id: 3,  name: "reda", age: 15, favoritfood: ["tacos","pizza","tanjiya"] },
        { _id: 4,  name: "saif", age: 5, favoritfood: ["pizza","tacos","cosamia"] },
        { _id: 5,  name: "wissam", age: 17, favoritfood: ["tacos","tacos","cosamia"] },
        { _id: 6,  name: "ali", age: 28, favoritfood: ["burritos","pizza","salad"] },
        { _id: 7,  name: "sara", age: 34, favoritfood: ["burritos","tacos","tajine"] },
        { _id: 8,  name: "omar", age: 22, favoritfood: ["burritos","pasta","tanjiya"] },
        { _id: 9,  name: "laila", age: 19, favoritfood: ["burritos","cosamia","tacos"] },
        { _id: 10, name: "youssef", age: 40, favoritfood: ["burritos","pizza","tacos"] },
        { _id: 11, name: "nour", age: 25, favoritfood: ["burritos","tajine","sefa"] }
    ])
        console.log("finding the first person who like tanjiya ")
        const d = await person.findOne({favoritfood : {$in : ["tanjiya"]} });
        console.log(d);
    }
    await asyncfunc();
     async function findingbyid(id){
        const doc = await person.findById(id);
        if (!doc){
            console.log("the document is not found");
        }else{
            console.log("the original document is:",doc);
            doc.favoritfood.push("hamburger");
            await doc.save();
            console.log("the modified is:",doc)
        }
    }
    await findingbyid(5);
    async function findbyname(Name){
        const doc = await person.findOneAndUpdate({name:Name},{$set : {age : 20 }},{new:true});
        console.log("the new doc is :",doc);
    }
    await findbyname("laila")
     async function findandrem(id) {
        try{
            await person.findByIdAndDelete(id)
            console.log(`the doc with id = ${id} is removed`)
        }catch(err){
            console.error("the error is:",err)
        }
    }
    await findandrem(1);
     async function chainofqueries() {
        const data = await person.find({favoritfood : {$in : ["burritos"]}}).sort({name:1}).limit(3).select("-age");
        console.log(data);
    }
    await chainofqueries()
}
globale()
