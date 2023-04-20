import { generateTablist } from "mineflayer-playerlist";
import mineflayer from "mineflayer";
import { writeFile } from "fs/promises";


const Options: mineflayer.BotOptions;
const bot = mineflayer.createBot(Options);

/**
 * Getting an array of objects with player names along with their ping from the mineflayer bot.
 * @returns [{ name: string, ping: number }];
 */
const getPlayerNamesAndPing = () => Object.keys(bot.players).map(player => ({ name: player, ping: bot.players[player].ping }));

try {

  /**
   * Generating Base64 Encoded PNG Image of Tablist.
   */
  const tablistBase64 = await generateTablist(getPlayerNamesAndPing);

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
