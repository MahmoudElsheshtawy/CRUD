const appError= require( "../utils/appError")

module.exports =(...rolse)=>{
    //  console.log("rolse" ,rolse)
    return(req,res,next)=>{
        if(!rolse.includes(req.currentUser.role)){
            return next(appError.create( "this role is not athorized" ,401))
        }
     next()
    }
}