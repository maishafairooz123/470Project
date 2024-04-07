import React, { useEffect, useReducer } from 'react'
import { getAll, search } from '../../../Services/foodService';
import Thumbnails from '../../Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../Search/search';

const initialState = {foods: []};

const reducer = (state, action) => {
    switch (action.type) {
    case 'Foods':
        return {...state, foods: action.payload};
    default:
        return state;   
    } 
};
export default function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {foods} = state;
    const {searchTerm} = useParams();

    useEffect(() => {
        const loaded = searchTerm? search(searchTerm) : getAll();
        loaded.then(foods => dispatch({type: 'Foods', payload: foods}));
    }, [searchTerm]);
  return (
    <>
    <Search />
    <Thumbnails foods={foods} />
    </>

  )
}
