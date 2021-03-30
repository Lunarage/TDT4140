import { Activity, Category, Equipment, User } from "../types/APITypes";

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

export type Organization = BaseState & {
    id: number;
    name: string;
    description: string;
    image: string;
    external_link: string;
    user_member: string[];
};

export type Event = {
    id: number;
    title: string;
    date: string;
    organization_owner: number;
    organization_owner_name: number;
    user_owner: number;
    user_owner_username: string;
    description: string;
    location: string;
    categories_names: string[];
    categories: number[];
    activity_level: number;
    equipment_used: number[];
    equipment_used_names: string[];
    max_participants: number;
};
