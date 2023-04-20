import path = require("path");
import type { PlayerList } from "../..";
import * as Canvas from "canvas";

const fontPath = path.resolve(__dirname, '../../assets/mc.otf');
const assetsDir = path.resolve(__dirname, '../../assets');

export default function draw (names: PlayerList[]) {
    return new Promise(async (resolve, reject) => {
        
        let width = Math.ceil(names.length / 16) * 278;

        Canvas.registerFont(fontPath, { family: "mc" });

        const canvas = Canvas.createCanvas(width + 2, 350);

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.font = "16px mc";

        const drawBlock = async(x: number, z: number, name: string, ping: number) => {
            ctx.fillStyle = "#D3D3D3";
            ctx.globalAlpha = 1;
            ctx.fillRect(x + 2, z, 276, 20);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "black";

            try {
                let avatarImg = await Canvas.loadImage(`https://mc-heads.net/avatar/${name}/16`);
                ctx.drawImage(avatarImg, x + 5, z + 2, 16, 16);

            } catch (err) {
                console.error(err);
            };

            const pingImg = await Canvas.loadImage(loadPing(ping));
            ctx.drawImage(pingImg, x + 259, z + 2, 16, 16);
            ctx.fillText(name, x + 23, z + 16);
        };

        const renderTab = (names: PlayerList[]) => {
            return new Promise(async resolve => {
                let z = 0;
                let x = 0;

                for (const player of names) {
                    if (z > 330) {
                        x = x + 278;
                        z = 0;
                    };
                    await drawBlock(x, z, player.name, player.ping);
                    z = z + 22;
                }

                resolve(true);

            })
        };

        await renderTab(names);
        const tablist = canvas.toDataURL("image/png");
        return resolve(tablist);
    })

}


function loadPing(ping: number) {
    if (ping < 0) return path.join(assetsDir, 'signal_0.png');
    if (ping <= 150) return path.join(assetsDir, 'signal_5.png');
    if (ping <= 300) return path.join(assetsDir, 'signal_4.png');
    if (ping <= 600) return path.join(assetsDir, 'signal_3.png');
    if (ping <= 1000) return path.join(assetsDir, 'signal_2.png');
    return path.join(assetsDir, 'signal_1.png');
  }
  