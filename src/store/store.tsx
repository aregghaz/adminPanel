// // import { Action, applyMiddleware, createStore } from "redux";
// // import { composeWithDevTools } from "redux-devtools-extension";
// // import  {thunk, ThunkAction } from "redux-thunk";
// // import reducers, { ReducerType } from "./reducers";
// //
// //
// // export type AppStateType = ReturnType<ReducerType>
// //
// // export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
// //
// // //export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// //
// // // TODO: Save State after change Mode themes
// //
// // export const loadState = (state: AppStateType) => {
// //     try {
// //         const serializedState = localStorage.getItem("state");
// //         if (serializedState === null) {
// //             return undefined;
// //         }
// //         return JSON.parse(serializedState);
// //     } catch (e:any) {
// //         throw new Error(e);
// //     }
// // };
// //
// // const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
// //
// // store.subscribe(() => loadState(store.getState()));
// // export default store;
// import {Action, applyMiddleware, createStore} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
// // import thunk from 'redux-thunk';
// // export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
// import reducers, {ReducerType} from './reducers';
// import {ThunkAction} from "redux-thunk";
//
// export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
// //
// export type AppStateType = ReturnType<ReducerType>
// //export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// //
// const store = createStore(reducers, composeWithDevTools(applyMiddleware()));
//
// export default store;
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers";
const initialState = {};
const middleware = [thunk];
const applied = composeWithDevTools ( applyMiddleware(...middleware) ); //error!
const store = createStore(reducers, initialState, applied);


export default store;