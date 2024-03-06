import { prisma } from "../init/prisma"
import cryptoRandomString from 'crypto-random-string';

export async function login(username: string, password: string){
    try{
        if(!username || !password){
            return {success: false, message: "No Username/Password Entered.", code: "MISSING_CREDENTIALS"}
        }
        const user = await prisma.user.findFirst({
            where: {
                password: password,
                username: username
            }
        })
        if(!user){
            return {success: false, message: "Invalid Credentials", code: "INVALID_CREDENTIALS"}
        }
        const session = await prisma.session.create({
            data: {
                session: `${cryptoRandomString({length: 100, type: 'url-safe'})}`,
                userId: user.id
            }
        })
        if(!session){
            // how ??
            return {success: false, message: "No session created", code: "NO_SESSION_CREATED"}
        }
        return {success: true, message: "Logged in!", code: "SUCCESS", session: session, user: user}
    }catch(e){
        console.log("[ERROR] Login errored:")
        console.log(e)
        return {success: false, message: "Internal Server Error", code: "INTERNAL_SERVER_ERROR"}
    }
}