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

export const getUser = (username: string, password: string) => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.USER_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .post("api/token-auth", { username: username, password: password })
            .then((response) => {
                dispatch({
                    type: ActionTypes.USER_FINISHED,
                    payload: response,
                });
            })
            .then((r) => handleError(r))
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: ActionTypes.USER_ERROR,
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
