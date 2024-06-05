const UserAuth = (req, res, next) => {
    const{ Name , Description  }= req.body
    if (Name && Description) {
        next();
    } else {
        res.send("invalid data")
    }
}
const isAuth = (req,res,next)=>{
    let {user} = req.cookies; 

    if(user){
        next();
    }else{
        return res.redirect('/login');
    }
}

module.exports = {UserAuth,isAuth}
