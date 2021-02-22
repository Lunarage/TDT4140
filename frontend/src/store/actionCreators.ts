import { baseUrl } from "../consts";
import HttpClient from "../utilities/HttpClient";
import { ActionTypes } from "./actionTypes";
import { DispatchType } from "./types";

export const getEvents = () => {
    return async (dispatch: DispatchType) => {
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
            .catch((error) =>
                dispatch({ type: ActionTypes.EVENTS_ERROR, payload: error })
            );
    };
};

export const getOrgs = () => {
    return async (dispatch: DispatchType) => {
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
            .catch((error) =>
                dispatch({ type: ActionTypes.ORGS_ERROR, payload: error })
            );
    };
};
