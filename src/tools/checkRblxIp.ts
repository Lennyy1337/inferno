import axios from 'axios'
import { prisma } from '../init/prisma'

export async function checkRblxIp(ip: string){
    try{
        const check = await prisma.roblox_ip.findFirst({
            where: {
                ip: ip
            }
        })
        console.log(ip)
        if(check){
            console.log("IP CACHE HIT X1")
            return true
        }

        if(ip === "127.0.0.1"){
            return false
        }
        const ipdata = await (await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,isp,org,as,query`)).data
        console.log(ipdata)

        if(ipdata.status !== "SUCCESS"){
            return false
        }
        if(!ipdata.as.includes("Roblox") || !ipdata.as.includes("AS22697") || !ipdata.org.includes("Roblox") || !ipdata.isp.includes("Roblox")){
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

