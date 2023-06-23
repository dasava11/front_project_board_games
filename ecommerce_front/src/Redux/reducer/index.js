import { GET_ALL_GAMES } from "../action-types";

const initialState = {
    games: [],
    allGames: []
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;