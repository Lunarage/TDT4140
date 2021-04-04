import { baseUrl } from "../consts";
import HttpClient from "../utilities/HttpClient";
import { ActionTypes } from "./actionTypes";
import { DispatchType } from "./types";

// handles error for all action creators
const handleError = (response: any) => {
    if (response?.error) {
        throw response.error;
    }
    return response;
};

// Action creators for all states in the redux-system. Also some functions that are not connected to redux at the bottom.

// export const postEvent = (
//     title: string,
//     date: string | undefined,
//     description: string,
//     location: string,
//     categories: number[] | undefined,
//     equipment_used: number[] | undefined,
//     max_participants: number | undefined,
//     activity_level: number | undefined,
//     activity_price: number | undefined,
//     activity_image: File | undefined,
//     organization_owner: number | undefined,
//     user_owner: number,
//     token: string
// ) => {
//     return (dispatch: DispatchType) => {
//         dispatch({ type: ActionTypes.POST_EVENT_LOADING, payload: [] });
//         var formData = new FormData();

//         // setting all fields in form data
//         formData.append("title", JSON.stringify(title));
//         date && formData.append("date", JSON.stringify(date));
//         formData.append("description", JSON.stringify(description));
//         formData.append("location", JSON.stringify(location));
//         categories &&
//             categories.length > 0 &&
//             formData.append("categories", JSON.stringify(categories));
//         equipment_used &&
//             equipment_used.length > 0 &&
//             formData.append("equipment_used", JSON.stringify(equipment_used));
//         max_participants &&
//             formData.append(
//                 "max_participants",
//                 JSON.stringify(max_participants)
//             );
//         activity_level &&
//             formData.append("activity_level", JSON.stringify(activity_level));
//         activity_price &&
//             formData.append("activity_price", JSON.stringify(activity_price));
//         activity_image && formData.append("activity_image", activity_image);
//         organization_owner &&
//             formData.append(
//                 "organization_owner",
//                 JSON.stringify(organization_owner)
//             );
//         formData.append("user_owner", JSON.stringify(user_owner));

//         let client = new HttpClient(baseUrl, token, true);
//         return client
//             .postWithImage("api/activity/", formData)
//             .then((r) => handleError(r))
//             .then((response) => {
//                 dispatch({
//                     type: ActionTypes.POST_EVENT_FINISHED,
//                     payload: response,
//                 });
//             })
//             .catch((error) => {
//                 dispatch({
//                     type: ActionTypes.POST_EVENT_ERROR,
//                     payload: error,
//                 });
//             });
//     };
// };

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

export const getEvents = (type?: string, filters?: string) => {
    let filterString = "";
    if (filters) {
        filterString = "?" + filters;
    }
    let typeStr = "activity/";
    if (type == "user") {
        typeStr = "useractivities/";
    } else if (type == "organization") {
        typeStr = "organizationactivities/";
    }
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.EVENTS_LOADING, payload: [] });
        let client = new HttpClient(baseUrl);
        return client
            .get("api/" + typeStr + filterString)
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

export const getStarred = (id: string, token: string) => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.STARRED_LOADING, payload: [] });
        let client = new HttpClient(baseUrl, token);
        return client
            .get("api/user/" + id + "/starred/")
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.STARRED_FINISHED,
                    payload: response,
                });
            })
            .catch((error) =>
                dispatch({ type: ActionTypes.STARRED_ERROR, payload: error })
            );
    };
};

export const getSignUps = (id: string, token: string) => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.SIGNUPS_LOADING, payload: [] });
        let client = new HttpClient(baseUrl, token);
        return client
            .get("api/user/" + id + "/signup/")
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.SIGNUPS_FINISHED,
                    payload: response,
                });
            })
            .catch((error) =>
                dispatch({ type: ActionTypes.SIGNUPS_ERROR, payload: error })
            );
    };
};

export const getMyActivities = (id: string, token: string) => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.MYACTIVITIES_LOADING, payload: [] });
        let client = new HttpClient(baseUrl, token);
        return client
            .get("api/user/" + id + "/activity/")
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.MYACTIVITIES_FINISHED,
                    payload: response,
                });
            })
            .catch((error) =>
                dispatch({
                    type: ActionTypes.MYACTIVITIES_ERROR,
                    payload: error,
                })
            );
    };
};

export const getAdminStatistics = () => {
    return (dispatch: DispatchType) => {
        dispatch({ type: ActionTypes.STATISTICS_LOADING, payload: [] });
        let client = new HttpClient(baseUrl, localStorage.getItem("token"));
        return client
            .get("api/activity/statistics")
            .then((r) => handleError(r))
            .then((response) => {
                dispatch({
                    type: ActionTypes.STATISTICS_FINISHED,
                    payload: JSON.parse(response),
                });
            })
            .catch((error) =>
                dispatch({ type: ActionTypes.STATISTICS_ERROR, payload: error })
            );
    };
};

// Those below is not connected to the redux system. They are generally only used once, and there is no need to store the response.

export const signUpUser = (id: string, token: string) => {
    let client = new HttpClient(baseUrl, token);
    return client
        .put("api/activity/" + id + "/signup/", { id })
        .then((r) => handleError(r))
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return { error: error };
        });
};

export const revokeSignUpUser = (id: string, token: string) => {
    let client = new HttpClient(baseUrl, token);
    return client
        .delete("api/activity/" + id + "/signup/")
        .then((r) => handleError(r))
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return { error: error };
        });
};

export const starUser = (id: string, token: string) => {
    let client = new HttpClient(baseUrl, token);
    return client
        .put("api/activity/" + id + "/star/", { id })
        .then((r) => handleError(r))
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return { error: error };
        });
};

export const revokeStarUser = (id: string, token: string) => {
    let client = new HttpClient(baseUrl, token);
    return client
        .delete("api/activity/" + id + "/star/")
        .then((r) => handleError(r))
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return { error: error };
        });
};

export const postUser = (
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    email: string
) => {
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
            return response;
        })
        .catch((error) => {
            return { error: error };
        });
};

export const getUser = (username: string, password: string) => {
    let client = new HttpClient(baseUrl);
    return client
        .post("api/token-auth", { username, password })
        .then((r) => handleError(r))
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return { error: error };
        });
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
    activity_price: number | undefined,
    organization_owner: number | undefined,
    user_owner: number,
    token: string
) => {
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
            activity_price,
            equipment_used,
            max_participants,
        })
        .then((r) => handleError(r))
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return { error: error };
        });
};

export const putImage = (activity_image: File, id: number, token: string) => {
    let client = new HttpClient(baseUrl, token);
    return client
        .put("api/activity/" + id + "/image", {
            activity_image,
        })
        .then((r) => handleError(r))
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return { error: error };
        });
};
