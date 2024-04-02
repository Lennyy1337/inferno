import axios, { AxiosResponse } from "axios"
import { RobloxApiResponse } from "../types/robloxApiResponse"

export async function getGameData(universeId: string): Promise<RobloxApiResponse> {
    return new Promise(async (resolve, reject) => {
        await axios.get(`https://games.roblox.com/v1/games?universeIds=${universeId}`).then((response: AxiosResponse) => {
            if (response.data) {
                if ((response.data.data as any[]).length > 0) {
                    const responseData: any = response.data.data[0] as RobloxApiResponse as any 
                    resolve(responseData)
                } else {
                    resolve({
                        id: 0,
                        rootPlaceId: "",
                        sourceName: "",
                        sourceDescription: "",
                        visits: 0,
                        playing: 0,
                        genre: "All",
                        universeAvatarType: "PlayerChoice"
                    })
                }
            }
        })
    })
}