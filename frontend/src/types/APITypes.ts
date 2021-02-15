export type Activity = {
    id: number; // Unique ID
    title: string;
    date: string; // Date object?
    description: string;
    categories: number[]; // List of category IDs
    equipment: number[]; // List of equipment IDs
    image: string; // URL
    location: string;
    max_participants: number | null;
    activity_level: 1 | 2 | 3 | 4 | 5; // Number of stars or something
    organization_owner: number | null; // Organization ID
    user_owner: number; // User ID
};

export type User = {
    id: number; // Unique ID
    first_name: string;
    last_name: string;
    username: string;
    email: string;
};

export type Organization = {
    id: number; // Unique ID
    name: string;
    description: string;
    image: string; // URL
    external_link: string; // URL (Organization Home Page)
    members: number[]; // List of user IDs
};

export type Category = {
    id: number; // Unique ID
    name: string;
};

export type Equipment = {
    id: number; // Unique ID
    name: string;
};
