import {
  GET_ALL_GAMES,
  GET_AUTHORS,
  GET_CATEGORIES,
  GET_DESIGNERS,
  GET_EDITORIALS,
  GET_LANGUAGES,
  GET_MECHANICS,
  GET_THEMATICS,
  GET_GAMES_BY_NAMES,
  SORT_GAMES,
  //FILTER_GAMES,
  FILTER_DELETE
} from "../action-types/index";

const initialState = {
  games: [],
  allGames: [],
  allAuthors: [],
  allCategories: [],
  allDesigners: [],
  allEditorials: [],
  allLanguages: [],
  allMechanics: [],
  allThematics: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
      };

    case GET_GAMES_BY_NAMES:
      return {
        ...state,
        allGames: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case GET_AUTHORS:
      return {
        ...state,
        allAuthors: action.payload,
      };
    case GET_DESIGNERS:
      return {
        ...state,
        allDesigners: action.payload,
      };
    case GET_EDITORIALS:
      return {
        ...state,
        allEditorials: action.payload,
      };
    case GET_LANGUAGES:
      return {
        ...state,
        allLanguages: action.payload,
      };
    case GET_MECHANICS:
      return {
        ...state,
        allMechanics: action.payload,
      };
    case GET_THEMATICS:
      return {
        ...state,
        allThematics: action.payload,
      };
    case SORT_GAMES:
      let sortsGames = [];

      if (action.payload === "order") {
        sortsGames = state.allGames;
      } else if (action.payload === "highest price") {
        sortsGames = state.allGames?.sort((a, b) =>
          Number(a.price.split(".")[0]) > Number(b.price.split(".")[0]) ? -1 : 1
        );
      } else if (action.payload === "lowest price") {
        sortsGames = state.allGames?.sort((a, b) =>
          Number(a.price.split(".")[0]) > Number(b.price.split(".")[0]) ? 1 : -1
        );
      } else if (action.payload === "A-Z") {
        sortsGames = state.allGames?.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (action.payload === "Z-A") {
        sortsGames = state.allGames?.sort((b, a) =>
          a.name.localeCompare(b.name)
        );
      }
      sortsGames = [...sortsGames];
      return {
        ...state,
        allGames: sortsGames,
      };
    // case FILTER_GAMES:

    //    let filterGames = [];

        

    //     if (action.payload.nameType === "mechanic_name") {
    //       filterGames = state.allGames.filter((game)=> game.Mechanic?.mechanic_name && game.Mechanic?.mechanic_name.includes(action.payload.value))
          
    //     }
    //     if (action.payload.nameType === "thematic_name") {
    //       filterGames = state.allGames.filter((game)=>game.Thematic?.thematic_name && game.Thematic?.thematic_name.includes(action.payload.value))
         
    //     }

    //     if (action.payload.nameType === "category_name") {
    //       filterGames = state.allGames.filter((game)=>game.Categories?.some((c)=>c.category_name && c.category_name === action.payload.value))
          
    //     }
      
    //     return{
    //       ...state, 
    //       allGames: filterGames

    //     } 

        case FILTER_DELETE:

        let filterDeleted = [];
        

        filterDeleted = state.games
        

        if (action.payload.mechanic_name !== ""  ) {
          filterDeleted = filterDeleted.filter((game)=> game.Mechanic?.mechanic_name && game.Mechanic?.mechanic_name.includes(action.payload.mechanic_name))
          
        }
        if (action.payload.thematic_name !== "") {
          filterDeleted = filterDeleted.filter((game)=>game.Thematic?.thematic_name && game.Thematic?.thematic_name.includes(action.payload.thematic_name))
         
        }

        if (action.payload.category_name !== "") {
          filterDeleted = filterDeleted.filter((game)=>game.Categories?.some((c)=>c.category_name && c.category_name === action.payload.category_name))
          
        }
      
        return{
          ...state, 
          allGames: filterDeleted

        } 


    default:
      return state;
  }
};

export default rootReducer;
