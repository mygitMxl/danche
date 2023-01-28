
import { legacy_createStore,combineReducers } from "redux";
import  Header  from "@/redux/reducer/Header";
import {composeWithDevTools } from 'redux-devtools-extension'; 
const reducer=combineReducers({Header})
const store=legacy_createStore(reducer,composeWithDevTools())
export default store