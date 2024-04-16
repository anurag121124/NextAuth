import { resend } from "@/lib/Resend";
import VerificationEmail from "../../email/verficationEmail";
import { ApiResponse } from "@/Types/ApiResponse";



export async function SendVerficationEmail(
    email: string,
    username:string,
    verifyCode:string
):Promise<ApiResponse> {
   try {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],
        subject: 'Verification Code',
        react: VerificationEmail({ username,otp:verifyCode }),
      });
    return{success:true,message:'verifacation Email Succesfully'}
   } catch (emailError) {
    console.log("Error sending verifacation Email",emailError)
    return{success:false,message:'Failed to send verifcation email'}

    
   }
  
        
}


