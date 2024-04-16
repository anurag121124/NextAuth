import { SendVerficationEmail } from "@/Helpers/SendVerificationEmail";
import dbConnect from "@/lib/Dbconnect";
import { UserModel } from "@/model/user";
import bcrypt from "bcryptjs";


export async function POST(request:Request) {
    await dbConnect()
    try {
         const {username,email,password} = await request.json()   
         const exitingUserVerifiedByUsername =  await UserModel.findOne({
            username,
            isVerified:true
         }) 
         
         if (exitingUserVerifiedByUsername) {
            return Response.json({  
                success:false,
                message:"User Name alreday is taken"      
            },{status:400})  
         } 
       const existingUserByEmail =  await UserModel.findOne({email})
       const verifyCode = Math.floor(100000+Math.random()*90000).toString()
         
        if(existingUserByEmail){
            true // back here

        } else{
           const hashpassword =  await bcrypt.hash(password,10)
           const expriryDate = new Date()
           expriryDate.setHours(expriryDate.getHours()+1)

          const newUser =  new UserModel({
            username,
            email,
            password: hashpassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: expriryDate,
            isVerified:false,
            isAcceptingMessage: true,
            messages: []
           })

           await newUser.save()
        }
        //send verfication email

      const emailResponse =  await SendVerficationEmail(
            email,
            username,
            verifyCode
        )

        if (emailResponse.success) {
            return Response.json ({
                success:false,
                message: emailResponse.message 
            },{status:500}) 
        } 

        return Response.json ({
            success:true,
            message: "User registred Succuessfully Please Verify your email" 
        },{status:500}) 
    

    } catch (error) {
        console.log('Error registering user',error)
        return Response.json({
            success:false,
            message:"Error Registerting user"
        },
        {
            status:500
        }
    )
    }

    
}