const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

module.exports =
{
    PORT : process.env.PORT,
    MONGODB_URL : process.env.MONGODB_URL,
    SALT : bcrypt.genSaltSync(10)
}
