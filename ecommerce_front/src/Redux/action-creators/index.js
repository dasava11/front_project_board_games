import axios from 'axios'
import { GET_ALL_GAMES } from '../action-types'
import { GET_DETAIL } from '../action-types';

const AllGames = import.meta.env.VITE_GET_ALL_GAMES;

export const getAllGames = () =>{
    return async (dispatch) =>{
        try {
            const response = await axios.get(AllGames)
            dispatch({type: GET_ALL_GAMES, payload: response.data})
        } catch (error) {
            alert('Ha habido un error en la base de datos', error.message)
        }
    }
}

export const getDetail = (id) =>{
    return async (dispatch) =>{
        try {
            dispatch({ type: GET_DETAIL, payload: id });
        } catch (error) {

        }
    }
}