export type State = {
    eventsReducer: EventsState;
    orgsReducer: OrgsState;
};

export type Action = {
    type: string;
    payload: any;
};

export type DispatchType = (args: Action) => Action;

type BaseState = {
    isLoading: boolean;
    errorMessage?: any;
};

export type EventsState = BaseState & {
    events?: Event[] | any;
};

export type OrgsState = BaseState & {
    organizations?: Organization[] | any;
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
    organization_owner: any;
    user_owner: any;
    description: string;
    location: string;
    categories: any[];
    activity_level: number;
    equipment_used: any[];
    max_participants: number;
};
