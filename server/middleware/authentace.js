const jwt = require("jsonwebtoken")

const authentication = (req,res,next)=>{
    var token = req.headers.authentication
    if(token){
        token = token.split(" ")[1]
    }else{
        return res.send("please login first")
    }
    if(token){
        jwt.verify(token, "hashingtoken", function(err, decoded) {
            if(decoded){

                req.body.user_id = decoded.user_id // bar
                next()
            }
            if(err){
                console.log(err)
                res.status(401).send({msg:"please login again","err":err.message})
            }
          });
    }else{
        res.send("login")
    }
}
module.exports = {authentication}