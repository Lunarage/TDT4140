export interface Activity {
    id: number; // Unique ID
    title: string;
    date: string; // Date object?
    description: string;
    categories: number[]; // List of category IDs
    equipment_used: number[]; // List of equipment IDs
    image?: string; // URL
    location: string;
    max_participants: number | null;
    activity_level: 1 | 2 | 3 | 4 | 5; // Number of stars or something
    organization_owner: number | null; // Organization ID
    user_owner: number; // User ID
}

export interface User {
    id: number; // Unique ID
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

export interface Organization {
    id: number; // Unique ID
    name: string;
    description: string;
    image?: string; // URL
    external_link: string; // URL (Organization Home Page)
    members: number[]; // List of user IDs
}

export interface Category {
    id: number; // Unique ID
    name: string;
}

export interface Equipment {
    id: number; // Unique ID
    name: string;
}
