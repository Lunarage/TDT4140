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
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.POST_USER_FINISHED,
                    payload: response,
                });
            })
            .catch((error) => {
                dispatch({
                    type: ActionTypes.POST_USER_ERROR,
                    payload: error,
                });
            });
    };
};

export const postEvent = (
    title: string,
    date: string | undefined,
    description: string,
    location: string,
    categories: number[] | undefined,
    equipment_used: number[] | undefined,
    max_participants: number | undefined,
    activity_level: number | undefined,
    organization_owner: number | undefined,
    user_owner: number,
    activity_image: string | undefined,
    token: string
) => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.POST_EVENT_LOADING, payload: [] });
        let client = new HttpClient(baseUrl, token);
        return client
            .post("api/activity/", {
                title,
                date,
                organization_owner,
                user_owner,
                description,
                location,
                categories,
                activity_level,
                equipment_used,
                max_participants,
                activity_image,
            })
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.POST_EVENT_FINISHED,
                    payload: response,
                });
            })
            .catch((error) => {
                dispatch({
                    type: ActionTypes.POST_EVENT_ERROR,
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
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.GET_USER_FINISHED,
                    payload: response,
                });
            })
            .catch((error) => {
                dispatch({
                    type: ActionTypes.GET_USER_ERROR,
                    payload: error,
                });
            });
    };
};

export const getCurrentUser = (token: string) => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.GET_CURRENT_USER_LOADING, payload: [] });
        let client = new HttpClient(baseUrl, token);
        return client
            .get("api/current_user")
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.GET_CURRENT_USER_FINISHED,
                    payload: response,
                });
            })
            .catch((error) => {
                dispatch({
                    type: ActionTypes.GET_CURRENT_USER_ERROR,
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
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.ORGS_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .get("api/organization")
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

export const getCategories = () => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.CATEGORIES_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .get("api/category")
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.CATEGORIES_FINISHED,
                    payload: response,
                });
            })
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
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.EQUIPMENT_FINISHED,
                    payload: response,
                });
            })
            .catch((error) =>
                dispatch({ type: ActionTypes.EQUIPMENT_ERROR, payload: error })
            );
    };
};

export const signUpUser = (id: string, token: string) => {
    let client = new HttpClient(baseUrl, token);
    return client
        .put("api/activity/" + id + "/signup/", { id })
        .then((r) => handleError(r))
        .then((response) => {
            return { status: response };
        })
        .catch((error) => {
            return { errorStatus: error };
        });
};
