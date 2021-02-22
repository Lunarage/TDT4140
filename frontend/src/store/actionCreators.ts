import { baseUrl } from "../consts";
import { ActionTypes } from "./actionTypes";
import { DispatchType } from "./types";

const defaultGet: RequestInit = {
    mode: "cors",
    method: "GET",
    credentials: undefined,
    headers: new Headers({}),
};

const jsonFormatString = "?format=json";

const handleError = (response: any) => {
    if (response.error) {
        throw response.err;
    }
    return response;
};

export const getEvents = () => {
    return async (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.EVENTS_LOADING, payload: [] });
        return fetch(baseUrl + `api/activity/`, defaultGet)
            .then((r) => r.json())
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.EVENTS_FINISHED,
                    payload: response,
                });
            })
            .catch((error) =>
                dispatch({ type: ActionTypes.EVENTS_ERROR, payload: error })
            );
    };
};

export const getOrgs = () => {
    return async (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.ORGS_LOADING, payload: [] });
        return fetch(
            baseUrl + `api/organization/` + jsonFormatString,
            defaultGet
        )
            .then((r) => r.json())
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.ORGS_FINISHED,
                    payload: response,
                });
            })
            .catch((error) =>
                dispatch({ type: ActionTypes.ORGS_ERROR, payload: error })
            );
    };
};
