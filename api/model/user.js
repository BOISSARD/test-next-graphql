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
        const favourites = await this.store.favourites.findAll({ where: { userId: users[0].id } });
        const user = users[0].get()
        user.favourites = favourites.map(favourite => favourite.get())
        console.log(user)
        return user
    }
  
    async addFavourite({name}) {
        const userId = this.context.user ? this.context.user.id : null
        if(!userId) return false

        const res = await this.store.favourites.findOrCreate({
            where: { userId, name },
        });
        console.log("addFavourite", name, userId, "\nrésultat :", res && res.length && !!res[0].get())
        return res && res.length && !!res[0].get()
    }
  
    async removeFavourite({name}) {
        const userId = this.context.user ? this.context.user.id : null
        if(!userId) return false

        const res = await this.store.favourites.destroy({
            where: { userId, name },
        });
        console.log("removeFavourite", name, userId, "\nrésultat :", res)
        return true
    }

}

module.exports = UserAPI;
