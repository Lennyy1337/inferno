import { checkauth } from "./checkAuth";

export async function checkWl(auth: string){
    const check = await checkauth(auth)
    if(check.user?.role == "WHITELISTED" || check.user?.role == "OWNER" || check.user?.role == "STAFF"){
        return true
    }else{
        return false
    }
}