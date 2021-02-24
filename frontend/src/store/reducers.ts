import { ActionTypes } from "./actionTypes";
import {
    Action,
    EventsState,
    OrgsState,
    GetUserState,
    PostUserState,
    CategoriesState,
    EquipmentState,
    PostEventState,
} from "./types";

const initialState = {
    isLoading: false,
};

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
                errorMessage:
                    action.payload.message | action.payload.toString(),
            };
    }
    return state;
};

export const postUserReducer = (
    state: PostUserState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.POST_USER_FINISHED:
            return { ...state, isLoading: false, user: action.payload };
        case ActionTypes.POST_USER_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.POST_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage:
                    action.payload.message | action.payload.toString(),
            };
    }
    return state;
};

export const getUserReducer = (
    state: GetUserState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.GET_USER_FINISHED:
            return { ...state, isLoading: false, user: action.payload };
        case ActionTypes.GET_USER_LOADING:
            return { ...state, isLoading: true };
        case ActionTypes.GET_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage:
                    action.payload.message | action.payload.toString(),
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
                errorMessage: action.payload.message,
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
                errorMessage: action.payload.message,
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
                errorMessage: action.payload.message,
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
                errorMessage: action.payload.message,
            };
    }
    return state;
};
