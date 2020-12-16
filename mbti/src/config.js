const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    url: process.env.REACT_APP_API_URL,
    key: process.env.REACT_APP_API_KEY
};
