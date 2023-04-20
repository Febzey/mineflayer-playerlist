/**
 * 
 * This example will show you how to use "mineflayer-playerlist" package and save a Tablist image file locally.
 * 
 */


import { generateTablist, PlayerList } from "mineflayer-playerlist";
import { writeFile } from "fs/promises";

/**
 * Mock playerlist.
 */
const playerlist: PlayerList[] = [
  {
    name: "notFebzey",
    ping: 10
  },
];

try {

  /**
   * Generating Base64 Encoded PNG Image of Tablist.
   */
  const tablistBase64 = await generateTablist(playerlist);

  /**
   * Creating a Buffer from the Base64 string.
   */
  const buffer = Buffer.from(tablistBase64.replace("data:image/png;base64,",""), 'base64');

  /**
   * Saving the tablist as "tablist.png" to the root of this directory.
   */
  await writeFile("./tablist.png", buffer);


  /**
   * Catching errors, if any.
   */
} catch (err) {
  console.error(err)
}
