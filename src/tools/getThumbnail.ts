import axios, { AxiosResponse } from "axios"

export async function getThumbnail(placeId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        axios.get(`https://thumbnails.roblox.com/v1/assets?assetIds=${placeId}&returnPolicy=PlaceHolder&size=512x512&format=Jpeg&isCircular=false`, {
            timeout: 3000
        }).then((response: AxiosResponse) => {
            if (response.data) {
                resolve(response.data.data[0]?.imageUrl)
            }
        }).catch(e => {
            console.log("cant get thumbnail", e.message)
            resolve("https://t1.rbxcdn.com/933d7df4e55e67c2efde3291e833a904") //Static value
        })
    })
}