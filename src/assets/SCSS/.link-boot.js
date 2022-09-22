let dotenv = require("dotenv")

let fs = require("fs-extra")

dotenv.config()

let env = process.env.Node_env

console.log(env)

if( env == "dev"){
    fs.copy("node_modules/bootstrap/scss/", "src/assets/SCSS/bootstrap")
}