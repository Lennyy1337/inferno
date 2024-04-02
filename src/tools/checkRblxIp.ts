import axios from 'axios'
import { prisma } from '../init/prisma'

export async function checkRblxIp(ip: string){
    try{
        const check = await prisma.roblox_ip.findFirst({
            where: {
                ip: ip
            }
        })
        if(check){
            console.log("IP CACHE HIT X1")
            return true
        }

        if(ip === "127.0.0.1"){
            return false
        }
        const ipdata = await (await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,isp,org,as,query`)).data
        if(ipdata.status !== "success"){
            console.log("😭😭 broke 😭😭") 
            return false
        }
        if(!ipdata.as.includes("AS22697")){
            console.log("Rip")
            return false
        }

        await prisma.roblox_ip.create({
            data: {
                ip: ip
            }
        })

        return true
    }catch(e){
        console.log(e)
        return false
    }
}

