import axios from "axios";
import {
  GET_ALL_GAMES,
  GET_CATEGORIES,
  GET_AUTHORS,
  GET_DESIGNERS,
  GET_LANGUAGES,
  GET_EDITORIALS,
  GET_MECHANICS,
  GET_THEMATICS,
  GET_GAMES_BY_NAMES,
  SORT_GAMES,
  FILTER_DELETE,
  GET_ALL_USERS,
  GET_ALL_PURCHASES,
  GET_USER_BY_ID,
  GET_ROLES,
  SET_DARK_MODE,
  GET_ALL_GAMES_ADMIN,
  GET_WISH_LIST,
} from "../action-types/index";
import { toast } from "react-toastify";

const VITE_URL_GAMES = import.meta.env.VITE_URL_GAMES;
const VITE_URL_CATEGORIES = import.meta.env.VITE_URL_CATEGORIES;
const VITE_URL_AUTHORS = import.meta.env.VITE_URL_AUTHORS;
const VITE_URL_DESIGNERS = import.meta.env.VITE_URL_DESIGNERS;
const VITE_URL_LANGUAGES = import.meta.env.VITE_URL_LANGUAGES;
const VITE_URL_EDITORIALS = import.meta.env.VITE_URL_EDITORIALS;
const VITE_URL_MECHANICS = import.meta.env.VITE_URL_MECHANICS;
const VITE_URL_THEMATICS = import.meta.env.VITE_URL_THEMATICS;
const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;
const VITE_GET_ALL_GAMES_ADMIN = import.meta.env.VITE_GET_ALL_GAMES_ADMIN;
const VITE_URL_GET_PURCHASES = import.meta.env.VITE_URL_GET_PURCHASES;

export const getAllGames = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_GAMES);
      dispatch({ type: GET_ALL_GAMES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllGamesAdmin = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://backprojectboardgames-production.up.railway.app/games/admin"
      );
      console.log(response.data);
      return dispatch({ type: GET_ALL_GAMES_ADMIN, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getWishList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${VITE_URL_USERS}/${localStorage.getItem("userId")}`
      );
      const wish_list = response.data.wish_list;
      console.log(wish_list);
      return dispatch({ type: GET_WISH_LIST, payload: wish_list });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getGamesByName = (name) => {
  return async (dispatch) => {
    try {
      const responseF = await axios.get(`${VITE_URL_GAMES}/name/?name=${name}`);
      dispatch({ type: GET_GAMES_BY_NAMES, payload: responseF.data });
    } catch (res) {
      alert(res.response.data.message);
    }
  };
};

export const postGames = (data) => {
  console.log(data);
  return async () => {
    try {
      await axios.post(VITE_URL_GAMES, data);
      toast.success("The game was successfully created");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_CATEGORIES);
      dispatch({ type: GET_CATEGORIES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postCategories = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_CATEGORIES, data);
      toast.success("The category was successfully created");
      dispatch(getCategories());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getAuthors = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_AUTHORS);
      dispatch({ type: GET_AUTHORS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postAuthors = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_AUTHORS, data);
      toast.success("Author was successfully created");
      dispatch(getAuthors());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getDesigners = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_DESIGNERS);
      dispatch({ type: GET_DESIGNERS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postDesigners = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_DESIGNERS, data);
      toast.success("Designer was successfully created");
      dispatch(getDesigners());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getLanguages = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_LANGUAGES);
      dispatch({ type: GET_LANGUAGES, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postLanguages = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_LANGUAGES, data);
      toast.success("Language was successfully created");
      dispatch(getLanguages());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getEditorials = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_EDITORIALS);
      dispatch({ type: GET_EDITORIALS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postEditorials = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_EDITORIALS, data);
      toast.success("Editorial was successfully created");
      dispatch(getEditorials());
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const getMechanics = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_MECHANICS);
      dispatch({ type: GET_MECHANICS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postMechanics = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_MECHANICS, data);
      toast.success("Mechanic was successfully created");
      dispatch(getMechanics());
    } catch (error) {
      toast.error(error.message);
    }
  };
};
export const getThematics = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_THEMATICS);
      dispatch({ type: GET_THEMATICS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postThematics = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      await axios.post(VITE_URL_THEMATICS, data);
      toast.success("Thematic was successfully created");
      dispatch(getThematics());
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const sortGames = (payload) => {
  return {
    type: SORT_GAMES,
    payload,
  };
};

export const filterDelete = (payload) => {
  return {
    type: FILTER_DELETE,
    payload,
  };
};

export const setDarkMode = (payload) => {
  return {
    type: SET_DARK_MODE,
    payload,
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(VITE_URL_USERS);
      dispatch({ type: GET_ALL_USERS, payload: response.data.users });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllPurchases = () => {
  return async (dispatch) => {
    try {

      const resp = await axios.get(
        "https://backprojectboardgames-production.up.railway.app/purchase/"
      );
      // const resp = await axios.get("https://backprojectboardgames-production.up.railway.app/purchase/");


      let sorted = resp.data;

      sorted = sorted.sort((a, b) => {
        if (a.purchase_id < b.purchase_id) {
          return -1;
        } else if (a.purchase_id > b.purchase_id) {
          return 1;
        } else {
          return 0;
        }
      });

      dispatch({ type: GET_ALL_PURCHASES, payload: sorted });
    } catch (err) {
      console.error(err);
    }
  };
};
export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${VITE_URL_USERS}/${id}`);
      dispatch({ type: GET_USER_BY_ID, payload: resp.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getRoles = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(
        "https://backprojectboardgames-production.up.railway.app/roles"
      );
      dispatch({ type: GET_ROLES, payload: resp.data.roles });
    } catch (error) {
      console.error(error);
    }
  };
};
