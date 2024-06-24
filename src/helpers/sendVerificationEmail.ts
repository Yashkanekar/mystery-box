import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
    email:string,
    verifyCode:string,
    username:string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystery Message Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
          });
        return {
            success:true,
            message:"Verification email sent successfully"
        }
    } catch (error) {
        return {
            success:false,
            message:"Error while sending verification email"
        }
    }
}
