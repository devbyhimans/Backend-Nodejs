const JWT = require('jsonwebtoken');

async function authArtist(req,res,next) {
 
 const token = req.cookies.token;

 if(!token){
  return res.status(401).json({
   message:"Unauthorized"
  })}

  try{

   const decoded = JWT.verify(token,process.env.JWT_SECRET);

   if(decoded.role!="artist"){
    return res.status(401).json({message:"Only artist privileages, access denied"})
   }

   //modifying the request using the midddleware
   //creating a new property named user in the req
   req.user = decoded;

   next();

  }
  catch(err){
   console.log(err);
   return res.status(201).json({
    message:"Unauthorized"
   })
  }
}

async function authUser(req,res,next) {
  
  const token = req.cookies.token;

  if(!token){
  return res.status(401).json({
   message:"Unauthorized"
  })}

  try{

   const decoded = JWT.verify(token,process.env.JWT_SECRET);

   if(decoded.role != "user" && decoded.role != "artist"){
    return res.status(403).json({message:"You don't have access"})
   }

   req.user = decoded;

   next();

  }
  catch(err){
   console.log(err);
   return res.status(201).json({
    message:"Unauthorized"
   })
  }

}


module.exports = {authArtist, authUser};