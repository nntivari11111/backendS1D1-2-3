const express=require("express");
const fs=require("fs")
const  app= express()
app.use(express.json())

app.get("/",(req,res)=>{
    const result =fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsed_result=JSON.parse(result)
    const {homepage}=parsed_result
    res.send(homepage)
})


app.post("/",(req,res)=>{
    const log=req.body;
    const prev_data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsed_prevdata=JSON.parse(prev_data);
    const {homepage}=parsed_prevdata
    homepage.push(log);
    const latest_data=JSON.stringify(parsed_prevdata);
    fs.writeFileSync("./db.json", latest_data, "utf-8")
    res.send(latest_data)
})
app.patch("/",(req,res)=>{
    const {id,newunit}=req.body;
    const prev_data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsed_prevdata=JSON.parse(prev_data);
    const new_data=parsed_prevdata.homepage.map((ele)=>{
        if(ele.id ===id){
            return{...ele,change_unit:newunit}
        }
        else{
            return ele;
        }
    })
    parsed_prevdata.homepage=new_data;
    
    const latest_data=JSON.stringify(parsed_prevdata);
    fs.writeFileSync("./db.json", latest_data, "utf-8")
    res.send(latest_data)
})

app.put("/",(req,res)=>{
    const {id,unit,name,read}=req.body;
    console.log(name,read,"ds")
    const prev_data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsed_prevdata=JSON.parse(prev_data);
    const new_data=parsed_prevdata.homepage.map((ele)=>{
        if(ele.id ===id){
            if(name && id && unit && read){
            return{id,name,unit,read}
            }
            else if(name && id && unit){
                return{id,name,unit} 
            }
            else if(name && id){
                return{id,name} 
            }
            else if(unit && id){
                return{id,unit} 
            }
            else if(read && id){
                return{id,read} 
            }
        }
        else{
            return ele;
        }
    })
    parsed_prevdata.homepage=new_data;
    
    const latest_data=JSON.stringify(parsed_prevdata);
    fs.writeFileSync("./db.json", latest_data, "utf-8")
    res.send(latest_data)
})
app.delete("/",(req,res)=>{
    const {id}=req.body;
    
    console.log(id,"dj")
    const prev_data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsed_prevdata=JSON.parse(prev_data);
    const new_data= parsed_prevdata.homepage.map((ele)=>{
        console.log(ele.id)
        if(ele.id !==id){
            return(ele)
        }
     
    })
 
    parsed_prevdata.homepage=new_data;
    
    const latest_data=JSON.stringify(parsed_prevdata);
    fs.writeFileSync("./db.json", latest_data, "utf-8")
    res.send(latest_data)
})

app.listen(5000, ()=>{
    console.log("server 5000")
})