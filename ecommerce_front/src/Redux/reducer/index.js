import {
  GET_ALL_GAMES,
  GET_AUTHORS,
  GET_CATEGORIES,
  GET_DESIGNERS,
  GET_EDITORIALS,
  GET_LANGUAGES,
  GET_MECHANICS,
  GET_THEMATICS,
  GET_DETAIL,
} from "../action-types/index";

const initialState = {
  games: [],

  gameDetail: [],
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
    case GET_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
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
    default:
      return state;
  }
};

export default rootReducer;
