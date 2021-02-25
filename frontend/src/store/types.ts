import { Activity, Category, Equipment, User } from "../types/APITypes";
import { AuthenticationResponse } from "../utilities/types";

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
    getUserReducer: GetUserState;
    getCurrentUserReducer: GetCurrentUserState;
    postUserReducer: PostUserState;
    postEventReducer: PostEventState;
};

type BaseState = {
    isLoading: boolean;
    errorMessage?: any;
};

export type EventsState = BaseState & {
    events?: Event[];
};

export type GetUserState = BaseState & {
    user?: AuthenticationResponse;
};

export type GetCurrentUserState = BaseState & {
    currentUser?: User[];
};

export type PostUserState = BaseState & {
    user?: User;
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
