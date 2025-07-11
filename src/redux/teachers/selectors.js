export const selectTeachers = (state) => {
    return state.teachers.teachers;
}

export const selectIsLoading = (state) => {    
    return state.teachers.isLoading;
}   

export const selectIsEnd = (state) => {
        return state.teachers.isEnd; 
}
export const selectLastKey = (state) => {
    return state.teachers.lastKey;
}