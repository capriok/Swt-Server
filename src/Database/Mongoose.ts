import * as mongoose from 'mongoose';

const DBUser = process.env.DBUSER
const DBPass = process.env.DBPASS
const DBName = process.env.DBNAME

const Host = `mongodb+srv://${DBUser}:${DBPass}@`
const Conn = `sweetie.ikuci.mongodb.net/${DBName}?`
const Opts = `retryWrites=true&w=majority`

const URI = Host + Conn + Opts

const OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}
mongoose.set("useFindAndModify", false)

export default mongoose.connect(URI, OPTIONS)
