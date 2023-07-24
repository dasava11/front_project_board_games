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
  FILTER_DELETE,
  GET_ALL_USERS,
  GET_ALL_PURCHASES,
  GET_ROLES,
  SET_DARK_MODE,
  GET_USER_BY_ID,
  GET_ALL_GAMES_ADMIN,
  GET_WISH_LIST

} from "../action-types/index";

const initialState = {
  games: [],
  allGames: [],
  allGamesAdmin: [],
  allAuthors: [],
  allCategories: [],
  allDesigners: [],
  allEditorials: [],
  allLanguages: [],
  allMechanics: [],
  allThematics: [],
  allUsers: [],
  wish_list: [],
  filter: {
    mechanic_name: "",
    thematic_name: "",
    category_name: "",
  },
  userDetail:{},
  allRoles:[],
  allPurchases: [],
  darkMode: false,

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
      };

      case GET_ALL_GAMES_ADMIN:
        console.log("reducer");
        return {
          ...state,
          allGamesAdmin: action.payload,
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

    case GET_WISH_LIST:
      return {
        ...state,
        wish_list: action.payload,
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

    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };

    case FILTER_DELETE:
      let filterDeleted = [];

      filterDeleted = state.games;

      if (action.payload.mechanic_name !== "") {
        filterDeleted = filterDeleted.filter((game) =>
          game.Mechanics?.some(
            (c) =>
              c.mechanic_name &&
              c.mechanic_name === action.payload.mechanic_name
          )
        );
        state.filter = {
          ...state.filter,
          mechanic_name: action.payload.mechanic_name,
        };
        console.log(state.filter);
      } else {
        state.filter = {
          ...state.filter,
          mechanic_name: action.payload.mechanic_name,
        };
        console.log(state.filter);
      }
      if (action.payload.thematic_name !== "") {
        filterDeleted = filterDeleted.filter((game) =>
          game.Thematics?.some(
            (c) =>
              c.thematic_name &&
              c.thematic_name === action.payload.thematic_name
          )
        );
        state.filter = {
          ...state.filter,
          thematic_name: action.payload.thematic_name,
        };
        console.log(state.filter);
      } else {
        state.filter = {
          ...state.filter,
          thematic_name: action.payload.thematic_name,
        };
        console.log(state.filter);
      }

      if (action.payload.category_name !== "") {
        filterDeleted = filterDeleted.filter((game) =>
          game.Categories?.some(
            (c) =>
              c.category_name &&
              c.category_name === action.payload.category_name
          )
        );
        state.filter = {
          ...state.filter,
          category_name: action.payload.category_name,
        };
        console.log(state.filter);
      } else {
        state.filter = {
          ...state.filter,
          category_name: action.payload.category_name,
        };
        console.log(state.filter);
      }

      return {
        ...state,
        allGames: filterDeleted,
      };


case GET_ALL_PURCHASES:
  return {
    ...state,
    allPurchases:action.payload
  }
  case GET_USER_BY_ID:
    return {
      ...state,
      userDetail:action.payload
    }
    case GET_ROLES:
      return{
        ...state,
        allRoles: action.payload
      }

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
   

    default:
      return state;
  }
};

export default rootReducer;
