import { baseUrl } from "../consts";
import HttpClient from "../utilities/HttpClient";
import { ActionTypes } from "./actionTypes";
import { DispatchType } from "./types";

const handleError = (response: any) => {
    if (response?.error) {
        throw response.error;
    }
    return response;
};

export const postUser = (
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    email: string
) => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.POST_USER_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .post("api/user/", {
                first_name,
                last_name,
                username,
                password,
                email,
            })
            .then((response) => {
                dispatch({
                    type: ActionTypes.POST_USER_FINISHED,
                    payload: response,
                });
            })
            .then((r) => handleError(r))
            .catch((error) => {
                dispatch({
                    type: ActionTypes.POST_USER_ERROR,
                    payload: error,
                });
            });
    };
};

export const getUser = (username: string, password: string) => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.GET_USER_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .post("api/token-auth", { username, password })
            .then((response) => {
                dispatch({
                    type: ActionTypes.GET_USER_FINISHED,
                    payload: response,
                });
            })
            .then((r) => handleError(r))
            .catch((error) => {
                dispatch({
                    type: ActionTypes.GET_USER_ERROR,
                    payload: error,
                });
            });
    };
};

export const getEvents = () => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.EVENTS_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .get("api/activity")
            .then((response) => {
                dispatch({
                    type: ActionTypes.EVENTS_FINISHED,
                    payload: response,
                });
            })
            .then((r) => handleError(r))
            .catch((error) =>
                dispatch({ type: ActionTypes.EVENTS_ERROR, payload: error })
            );
    };
};

export const getOrgs = () => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.ORGS_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .get("api/organization")
            .then((response) => {
                dispatch({
                    type: ActionTypes.ORGS_FINISHED,
                    payload: response,
                });
            })
            .then((r) => handleError(r))
            .catch((error) =>
                dispatch({ type: ActionTypes.ORGS_ERROR, payload: error })
            );
    };
};

export const getCategories = () => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.CATEGORIES_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .get("api/category")
            .then((response) => {
                dispatch({
                    type: ActionTypes.CATEGORIES_FINISHED,
                    payload: response,
                });
            })
            .then((r) => handleError(r))
            .catch((error) =>
                dispatch({ type: ActionTypes.CATEGORIES_ERROR, payload: error })
            );
    };
};

export const getEquipment = () => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.EQUIPMENT_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .get("api/equipment")
            .then((response) => {
                dispatch({
                    type: ActionTypes.EQUIPMENT_FINISHED,
                    payload: response,
                });
            })
            .then((r) => handleError(r))
            .catch((error) =>
                dispatch({ type: ActionTypes.EQUIPMENT_ERROR, payload: error })
            );
    };
};
