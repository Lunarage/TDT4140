import { Category, Equipment, User } from "../types/APITypes";
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
    postUserReducer: PostUserState;
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

export type PostUserState = BaseState & {
    user?: User;
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
    user_member: number[];
};

export type Event = {
    id: number;
    title: string;
    date: string;
    organization_owner: string;
    user_owner: string;
    description: string;
    location: string;
    categories: string[];
    activity_level: number;
    equipment_used: string[];
    max_participants: number;
};
