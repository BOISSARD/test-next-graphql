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
                favourites: {
                    read() {
                        return favouritesVar();
                    },
                    merge(existing, incoming) {
                        let favourites = [];
                        if (existing && existing.favourites) {
                            favourites = favourites.concat(existing.favourites);
                        }
                        if (incoming && incoming.favourites) {
                            favourites = favourites.concat(incoming.favourites);
                        }
                        return {
                            ...incoming,
                            favourites,
                        };
                    }
                }
            }
        }
    }
});

export const isLoggedInVar = makeVar(typeof window !== 'undefined' ? !!localStorage.getItem('token') : false);
export const favouritesVar = makeVar([]);
