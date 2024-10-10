const jwt = require("jsonwebtoken") ;


const Authenticated = async ( request , response , next ) =>{
    try {
       
        
        const incomingToken = request.cookies.jwttoken ;
        console.log(incomingToken,request.cookies,"ICT");
        
        if(!incomingToken )
        {  console.log("ICT UNATHORISED");
           return  response.status(200).json({
                message : "Unauthorized User" ,
                status:false 
            })
        }


        const decodedToken = await jwt.verify(incomingToken,process.env.JTWSECRETE) ;
        if( !decodedToken )
        {
           return response.status(401).json({
                message : "invalid token" ,
                status:false})
        }
        request.user = decodedToken ;
  
        
        request.userId = decodedToken.userId ;
        next() ;
    } catch (error) {
        console.log("Auth Middle wAre  ",error);
        
    }
    
}



module.exports = Authenticated ;