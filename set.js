const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUhwVHFQei9JRmwxeHJic2N5RXFia1lERFBBcjJIT01KS3BSbjJwaWkyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2FRcFR6R1BsS3BpcHNwRjRJNzBJQzl2SXk2T3R0RkY5T0JqcnZLeFZYST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQ2FNcW5iTWc3aUhzaEs4N2d1Ymc2MVBBM3dDb0FCUXE1VmVHczFDeG5JPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMb1F3ZUFSbTVXcExUMzBtbjh4UnF2YU5OMGczaGdnQitCTUxRdDR1NEJjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtCSktOcG5uS3pwRXZvc3NVbXdKTy9tTXZwaHExMDQ0YnJHejVBTGFybmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdsRmJxOVBFOENXelZ4ZTczZUtiWU1TODJXZHdXaE1TUlFCL1h0OG5VMG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU52Vi9QMjd4U0RQdllZU0FSbmpzN1VweU5rdjRGMi9HNEI5T3ZLQzMwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGN1OWg5VjQwb1RrMlpSbHlnVDlZVlNKa09hek1OVlk1bVowbk5vc21HND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpLMnhOeGdweWRGbUxKK2pPMFJRNzArSnA5Y0J0YkZzTGo0bWZZQVRsWW1jWlRrMnVWNHNRc3pLTmlUNEJYak9CM0U4L2hKblFydmZMbnMxbUg4aUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODcsImFkdlNlY3JldEtleSI6IjltYld6VFRZL211Ujl6VDNqamFmTjNwUFJvSXQzVG15YzZMYjNuUlRCaUE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjc4MTgyMzIyNjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0M5QjI3QUJCNDE2N0QwREEwQkE1RUNEQkRDMjc0RUQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTE4ODkzMX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiR2ZsRzVsQXlTZXFLNjFnSDRiRnhlUSIsInBob25lSWQiOiI4YTFmMmYzYy0zOGM3LTRlZGItOWU3Zi1lZjFmNjE3ZjE3OTgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEF2Q0JLKy90ckdvYXlPR3RvYTB0ZnRHZEU0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZrVzQvNDJKNVBQMU9MRjhiZnYzWjU3Zk45dz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJUQUNNNjJDTiIsIm1lIjp7ImlkIjoiMjc4MTgyMzIyNjk6MTFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2Nvb2J5IGRvbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVdIMXZrSEVMUHdsY0FHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaEc5NDVYN1hjZXN1TTVYWFFYY0FiUzIyN3AvQkNDaS9salNWRGtaYzl6OD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZEdKOVJSZ1BFWWlZZ0ZrbnZSbTlGeUFaOFNYNUZZWWtiSTJjQ1RQWlpzT0l6TGNuMmpsdXVVanRjQndVVENvK1hmdzNTQVAxRXAxTWhrZTNFM2lZQnc9PSIsImRldmljZVNpZ25hdHVyZSI6ImxPU1R5a2dxdE5EaENiY0ZtQ1BSR2xKMWVOZjh1ZEVBME5CTkN4TEQyWkVmbjhkeDg5eXI1aldrWTFmTnR4MHVZN1lYMGVUZDBxR2E0ckhZcEExVkJ3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc4MTgyMzIyNjk6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWVJ2ZU9WKzEzSHJMak9WMTBGM0FHMHR0dTZmd1Fnb3Y1WTBsUTVHWFBjLyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTE4ODkyOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIU3MifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝕬𝖛𝖊.𝕭",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27767494368",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "no",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝕬𝖛𝖊𝕭𝖔𝖙 𝕸𝕯',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
