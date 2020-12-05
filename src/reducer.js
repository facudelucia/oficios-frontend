export const initialState = {
    oficios: [],
    changas: [],
    searchOficio: null,
    oficioId: null,
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId")
}

const reducer = (state, action) => {

    switch (action.type) {
        case "GET_OFICIOS":
            return{
                ...state,
                oficios: action.oficios
            }
        case "GET_CHANGAS":
            return{
                ...state,
                changas:action.changas
            }
        case "SEARCH_OFICIO":
            return{
                ...state,
                searchOficio:action.searchOficio,
                oficioId: null
            }
        case "OFICIO_ID":
            return{
                ...state,
                oficioId: action.oficioId,
                searchOficio:null
            }
        case "RETURN":
            return{
                ...state,
                oficioId: null,
                searchOficio: null
            }
        case "LOGIN":
            localStorage.setItem("token", action.token)
            localStorage.setItem("userId", action.userId)
            return{
                ...state,
                token: action.token,
                userId: action.userId
            }
        case "LOGOUT":
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            return{
                ...state,
                token: null,
                userId: null
            }
    }

}
export default reducer