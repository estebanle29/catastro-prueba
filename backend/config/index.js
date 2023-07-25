import  Config  from "./config.json";

export const $db =()=> Config.db
export const $security=()=>Config.security
export const $serverPort=()=>Config.serverPort
