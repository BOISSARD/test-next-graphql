import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    },
                    merge(_, incoming) {
                        isLoggedInVar(incoming)
                        return isLoggedInVar()
                    }
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
console.log("CACHE isLoggedInVar", isLoggedInVar, typeof window !== 'undefined' ? localStorage.getItem('token') : null)
export const favouritesVar = makeVar([]);
