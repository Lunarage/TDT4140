import { Activity, Category, Equipment, User } from "../types/APITypes";

// types for action and store state.

export type Action = {
    type: string;
    payload: any;
};

export type DispatchType = (args: Action) => Action;

export type State = {
    eventsReducer: EventsState;
    orgsReducer: OrgsState;
    categoriesReducer: CategoriesState;
    equipmentReducer: EquipmentState;
    getCurrentUserReducer: GetCurrentUserState;
    postEventReducer: PostEventState;
    starredReducer: StarredState;
    signUpsReducer: SignUpsState;
    myActivitiesReducer: MyActivitiesState;
};

type BaseState = {
    isLoading: boolean;
    errorMessage?: any;
};

export type EventsState = BaseState & {
    events?: Event[];
};

export type GetCurrentUserState = BaseState & {
    currentUser?: User[];
};

export type PostEventState = BaseState & {
    event?: Activity;
};

export type OrgsState = BaseState & {
    organizations?: Organization[];
};

export type CategoriesState = BaseState & {
    categories?: Category[];
};

export type EquipmentState = BaseState & {
    equipment?: Equipment[];
};

export type StarredState = BaseState & {
    starred?: Event[];
};

export type SignUpsState = BaseState & {
    signUps?: Event[];
};

export type MyActivitiesState = BaseState & {
    myActivities?: Event[];
};

export type Organization = BaseState & {
    id: number;
    name: string;
    description: string;
    image: string;
    external_link: string;
    user_member: string[];
};

// event / activity
export type Event = {
    id: number;
    title: string;
    date: string;
    organization_owner: number; // id
    organization_owner_name: string;
    user_owner: number; // id
    user_owner_username: string;
    description: string;
    location: string;
    categories_names: string[];
    categories: number[]; // id
    activity_level: number;
    equipment_used: number[]; // id
    equipment_used_names: string[];
    max_participants: number;
};
