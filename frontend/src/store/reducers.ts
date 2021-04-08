import { ActionTypes } from "./actionTypes";
import {
    Action,
    EventsState,
    OrgsState,
    CategoriesState,
    EquipmentState,
    PostEventState,
    StarredState,
    SignUpsState,
    GetCurrentUserState,
    MyActivitiesState,
    StatisticsState,
} from "./types";

const initialState = {
    isLoading: false,
};

// reducers for all redux-states

export const postEventReducer = (
    state: PostEventState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.POST_EVENT_FINISHED:
            return { ...state, isLoading: false, event: action.payload };
        case ActionTypes.POST_EVENT_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.POST_EVENT_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const getCurrentUserReducer = (
    state: GetCurrentUserState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.GET_CURRENT_USER_FINISHED:
            return { ...state, isLoading: false, currentUser: action.payload };
        case ActionTypes.GET_CURRENT_USER_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.GET_CURRENT_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const eventsReducer = (
    state: EventsState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.EVENTS_FINISHED:
            return { ...state, isLoading: false, events: action.payload };
        case ActionTypes.EVENTS_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.EVENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const orgsReducer = (
    state: OrgsState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.ORGS_FINISHED:
            return {
                ...state,
                isLoading: false,
                organizations: action.payload,
            };
        case ActionTypes.ORGS_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.ORGS_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const categoriesReducer = (
    state: CategoriesState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.CATEGORIES_FINISHED:
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
            };
        case ActionTypes.CATEGORIES_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.CATEGORIES_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const equipmentReducer = (
    state: EquipmentState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.EQUIPMENT_FINISHED:
            return {
                ...state,
                isLoading: false,
                equipment: action.payload,
            };
        case ActionTypes.EQUIPMENT_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.EQUIPMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const starredReducer = (
    state: StarredState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.STARRED_FINISHED:
            return {
                ...state,
                isLoading: false,
                starred: action.payload,
            };
        case ActionTypes.STARRED_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.STARRED_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const signUpsReducer = (
    state: SignUpsState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.SIGNUPS_FINISHED:
            return {
                ...state,
                isLoading: false,
                signUps: action.payload,
            };
        case ActionTypes.SIGNUPS_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.SIGNUPS_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const myActivitiesReducer = (
    state: MyActivitiesState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.MYACTIVITIES_FINISHED:
            return {
                ...state,
                isLoading: false,
                myActivities: action.payload,
            };
        case ActionTypes.MYACTIVITIES_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.MYACTIVITIES_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};

export const statsReducer = (
    state: StatisticsState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.STATISTICS_FINISHED:
            return {
                ...state,
                isLoading: false,
                stats: action.payload,
            };
        case ActionTypes.STATISTICS_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.STATISTICS_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
    }
    return state;
};
