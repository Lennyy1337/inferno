import { prisma } from "../init/prisma"

export async function register(username: string, password: string){
    if(!username || !password){
        return {success: false, message: "No Username/Password Entered.", code: "MISSING_CREDENTIALS"}
    }
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })


    if(username.length < 3){
        return {success: false, message: "Username under 3 characters!"}
    }
    if(password.length < 6){
        return {success: false, message: "Password under 6 characters!"}
    }
    if(username.length > 20){
        return {success: false, message: "Username over 20 characters!"}
    }
    if(password.length > 64){
        return {success: false, message: "Password over 64 characters!"}
    }

    if(user){
        return {success: false, message: "Username already in use.", code: "USERNAME_TAKEN"}
    }
    const newuser = await prisma.user.create({
        data: {
            username: username,
            password: password,
            role: "NONE"
        }
    })
    return({success: true, message: "Account created! Please log in with the credentials.", code: "SUCCESS"})
}