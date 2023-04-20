import type { PlayerList } from "../index";
import draw from "./draw.js";


/**
 * Use this function to get a PNG Image Encoded in Base64 for a Tablist.
 * @param PlayerList[] [{ name: string, ping: number, headurl?: Image }]
 * @returns 
 */
export default async function generateTablist(players: PlayerList[]): Promise<string> {
    const tablistImage = await draw(players);
    return tablistImage as string;
}
