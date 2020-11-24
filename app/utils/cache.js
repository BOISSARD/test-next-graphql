import { InMemoryCache, useApolloClient, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    },
                    /*merge(_, incoming) {
                        console.log("merge isLoggedIn", _, incoming)
                        useApolloClient().cache.evict({ fieldName: "me" })
                        useApolloClient().cache.gc()
                        localStorage.removeItem('token')
                        localStorage.removeItem('userId')
                        isLoggedInVar(incoming)
                        return isLoggedInVar()
                    }*/
                },
                favorites: {
                    read() {
                        return favoritesVar();
                    },
                    merge(existing, incoming) {
                        console.log("favorites merge", existing, incoming)
                        let favorites = [];
                        if (existing && existing.favorites) {
                            favorites = favorites.concat(existing.favorites);
                        }
                        if (incoming && incoming.favorites) {
                            favorites = favorites.concat(incoming.favorites);
                        }
                        return {
                            ...incoming,
                            favorites,
                        };
                    }
                }
            }
        }
    }
});

export const isLoggedInVar = makeVar(typeof window !== 'undefined' ? !!localStorage.getItem('token') : false);
export const favoritesVar = makeVar([]);
