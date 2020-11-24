const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {

    constructor({ store }) {
        super();
        this.store = store;
    }
  
    initialize(config) {
        this.context = config.context;
    }
  
    async findOrCreateUser({ email: emailArg } = {}) {
        const email = this.context && this.context.user ? this.context.user.email : emailArg;
        if (!email || !isEmail.validate(email)) return null;
        // console.log("UserAPI findOrCreateUser", this.store.users)
        const users = await this.store.users.findOrCreate({ where: { email } });
        if(!users && users[0]) return null
        const favorites = await this.store.favorites.findAll({ where: { userId: users[0].id } });
        const user = users[0].get()
        user.favorites = favorites.map(favorite => favorite.get())
        //console.log(user)
        return user
    }

    async getFavorites() {
        const userId = this.context.user ? this.context.user.id : null
        //console.log("UserAPI getFavorites", userId)
        if(!userId) return []
        return await this.store.favorites.findAll({ where: { userId } });
    }
  
    async addFavorite({name}) {
        const userId = this.context.user ? this.context.user.id : null
        if(!userId) return false

        const res = await this.store.favorites.findOrCreate({
            where: { userId, name },
        });
        const val = res[0].get()
        //console.log("addFavorite", name, val.name, val.id)
        return {
            success: res && res.length && !!res[0].get(),
            message: "",
            favorite: {
                name: val.name,
                id: val.id
            }
        }
    }
  
    async removeFavorite({name}) {
        const userId = this.context.user ? this.context.user.id : null
        if(!userId) return false

        const res = await this.store.favorites.findOrCreate({
            where: { userId, name },
        });
        const val = res[0].get()
        const del = await res[0].destroy();
        //console.log("removeFavorite", name,"\nrésultat :", val, del)
        return {
            success: del > 0,
            message: "",
            favorite: {
                name: val.name,
                id: val.id
            }
        }
    }

}

module.exports = UserAPI;
