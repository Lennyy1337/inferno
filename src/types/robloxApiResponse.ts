export type RobloxApiResponse = {
    id: number,
    rootPlaceId: string,
    sourceName: string,
    sourceDescription: string,
    visits: number,
    playing: number,
    genre: "All" | "Tutorial" | "Scary" | "TownAndCity" | "War" | "Funny" | "Fantasy" | "Adventure" | "SciFi" | "Pirate" | "FPS" | "RPG" | "Sports" | "Ninja" | "WildWest";
    universeAvatarType: "MorphToR6" | "MorphToR15" | "PlayerChoice";
}