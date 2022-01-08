/* eslint-disable */

const {
    readFile,
    writeFile
} = require("fs/promises");

const xml2js = require("xml2js");
const DOMParser = require('xmldom').DOMParser;

const ddXmlEntityMap = new Map([
    ["A", "AIBrain_"],
    ["S", "Scene_"],
    ["B", "Bool_"],

    ["G_S", "The Grove of Spirits"],
    ["L_C", "Lost Cemetry"],
    ["E_U_W", "Estate of the Urn Witch"],
    ["C_M", "Ceramic Manor"],
    ["F_O_R", "Furnace Observation Rooms"],
    ["I_F", "Inner Furnace"],
    ["U_W_L", "The Urn Witch's Laboratory"],
    ["O_R", "Overgrown Ruins"],
    ["M_D", "Mushroom Dungeon"],
    ["F_F", "Flooded Fortress"],
    ["T_F_K", "Throne of the Frog King"],
    ["S_S", "The Stranded Sailor"],
    ["C_L", "Castle Lockstone"],
    ["C_F_C", "Camp of the Free Crows"],
    ["O_W", "The Old Watchtowers"],
    ["B_L", "Betty's Lair"],
])

async function readSplitsFiles() {
    const result = await readFile("./src/asset/dd-splits.xml");
    let output = result.toString();
    for (const [key, value] of ddXmlEntityMap) {
        output = output.replaceAll(`&${key};`, value);
    }
    return output;
}

async function parseXml(xmlString) {
    const xmlSerialized = new DOMParser().parseFromString(xmlString, "text/xml");
    const parsedXml = await xml2js.parseStringPromise(xmlSerialized);
    return parsedXml;
}

async function main() {
    const xmlFileContents = await readSplitsFiles();
    const parsed = await parseXml(xmlFileContents);
    await writeFile("./src/asset/dd-splits.json", JSON.stringify(parsed, null, 4));
    // const splitMap = new Map();
    // for (const section of parsed.Splits.Parent) {
    //     console.log(section["$"]);
    //     for (const split of section.Split) {
    //         const { name, text } = split["$"];
    //         splitMap.set(name, text);
    //     }
    // }

    // console.log(splitMap);
}

main();
