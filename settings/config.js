require("dotenv").config();
module.exports = {
    TOKEN: process.env.TOKEN || "", 
    PREFIX: process.env.PREFIX || "", 
    OWNER_ID: process.env.OWNER_ID || "1150890847768936458", 
    EMPTY_LEAVE: 60, 
    LEAVE_EMPTY: false, 
    LEAVE_FINISH: false, 
    LEAVE_STOP: false,
}
