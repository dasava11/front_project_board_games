import { GET_ALL_GAMES } from "../action-types";
import { GET_DETAIL } from "../action-types";

const initialState = {
    games: [],
    allGames: [],
    gameDetail: [],
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case GET_DETAIL:
            const copyGame = [...state.allGames]
            const gameFiltered = copyGame.filter((g) => g.game_id == action.payload)
            console.log(gameFiltered)
            return{
                ...state,
                gameDetail: gameFiltered
            }
        default:
            return state
    }
}

export default rootReducer;