import { prisma } from "../init/prisma"

export async function checkauth(auth: string){
    try{
        if(!auth || auth == undefined){
            return {success: false, message: "No Authorization Provided.", code: "INVALID_AUTH"}
        }
 
        const session = await prisma.session.findFirst({
            where: {
                session: auth
            }
        })   
 
        if(!session){
            return {success: false, message: "Invalid Session", code: "INVALID_AUTH"}
        }
        const user = await prisma.user.findFirst({
            where: {
                id: session.userId
            }
        })
        if(!user){
            return {success: false, message: "Invalid Session", code: "INVALID_AUTH"}
        }
        return {success: true, message: "Success!", code: "SUCCESS", user: user, session: session}
    }catch(e){
        console.log("[ERROR] CheckAuth errored:")
        console.log(e)
        return {success: false, message: "Internal Server Error", code: "INTERNAL_SERVER_ERROR"}
    }
}