import { UserDb } from "../models/userModel.js";
import { HashPassword, comparePassword } from "../helpers/authPassword.js";
import jwt  from "jsonwebtoken";
const secreate= "afdfdfdfsdfdsf";

export const register = async (req, res) => {

    const profile = req.file.path;
    const { name, userName, email, password, mobileNumber, address } = req.body;


    // console.log(req.file,19);
    // console.log(req.body,202);
    try {
        const user = await UserDb.findOne({ email: email })

        if (user) {
            return res.send("user already exits");
        }

        const hashedpass = await HashPassword(password)

        const newUser = new UserDb({
            name,
            userName,
            email,
            password: hashedpass,
            mobileNumber,
            address,
            profileImg: profile
        })

        await newUser.save();
        res.send("new user register ,thank you");
    } catch {
        res.send("found something wrong");
    }
};



export const login = async (req, res) => {

    const { email, password } = req.body;

    // localStorage.setItem("user email",email)

    try {
        // console.log(email);
        // console.log(password);


        const user = await UserDb.findOne({ email: email });

        const existPassword = user.password;

        const passChecking = await comparePassword(password, existPassword)

        // console.log(existPassword)
        // console.log(passChecking)

        // console.log(hashedpass);

       

        // const webToken = jwt.sign({user},secreate,{expiresIn:'300s'});
        // console.log(webToken)

        if (user) {
            // console.log(user.password) 
            if (passChecking) {
              
                // jwt.sign({ name: "abhi" }, secreate, { expiresIn: '300s' }, (err, token) => {
                //     // res.status(200).json({
                //     //     token
                //     // })
                //     res.cookie('token',token).json(user);   
                // })

                const webToken = jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'300s'});
                
                // console.log(webToken)

                res.cookie(String(user._id), webToken, {
                    path: "/",
                    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
                    httpOnly: true,
                    sameSite: "lax",
                  });

                  res
                  .status(200)
                  .json({ message: "Successfully Logged In", user, webToken });

                // res.send({ massage: "login successfully", user });
                // localStorage.setItem('token',webToken)
                // res.status(200).json({massage: "login successfully",user})
                
            } else {
                res.send({ massage: "username or password is wrong" });
            }
        }
    } catch (error) {
        res.send("user is not found")
    }

}


export const getUsers = async(req, res) => {

    // console.log("helllo")

    try {
        const users = await UserDb.find({})
            .then((data) => {
                res.send(data);
            })
    } catch (error) {
        res.send("users not found");
    }
}

// export const gettingProducsts = async(req ,res)=>{
//     try{
//          const products = await productDb.find({})
//          .then((data)=>{
//           res.send(data)
//          })
         
            
         
//       //    console.log()
//     }catch(error){
//        res.send("not found data");
//     } 
//   }




export const getSingleUser = async (req, res) => {

    // console.log("helllo")
    const { id } = req.params;
    const {token} = req.cookies; 

    console.log(token)

    try {
        const users = await UserDb.findOne({ _id: id })
            .then((data) => {
                res.send(data);
            })
    } catch (error) {
        res.send("users not found");
    }
}



export const deleteUser = async (req, res) => {

    const { id } = req.params;

    console.log("helllo")

    try {
        const users = await UserDb.findByIdAndDelete({ _id: id })
            .then((data) => {
                res.send(data);
            })
    } catch (error) {
        res.send("users not found");
    }
}




export const editUser = async (req, res) => {


    const profile = req.file.path;
    const { id } = req.params;
    console.log(id);
    const { name, userName, email, password } = req.body;

    console.log("helllo", 12)

    try {
        // const user = await UserDb.findOne({ _id: id })
        const updateUser = await UserDb.findOneAndUpdate({ _id: id }, {
            $set: {
                name,
                userName,
                email,
                password,
                profileImg: profile
            }
        }, { new: true });

        //     , {
        //     name,
        //     userName,
        //     email,
        //     password,
        //     profileImg
        // }, {
        //     new: true
        // })

        // then((data) => {
        //     res.send(data);
        // })
        //   console.log(user);
        //  user = new UserDb({
        //     name,
        //     userName,
        //     email,
        //     password,
        //     profileImg:profile
        // })


        await updateUser.save();

        res.send("USER UPDATED");

    } catch (error) {
        res.send("users not found");
    }
}

export const ejsFunct = async(req,res)=>{
   res.render('home')
}