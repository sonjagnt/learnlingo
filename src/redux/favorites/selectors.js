export const selectFavs = (state) => {
    return state.favorites.list;
}

export const selectFavsIsLoading = (state) => {
    return state.favorites.isLoading;
}   