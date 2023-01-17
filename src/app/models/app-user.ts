export interface AppUser{
    uid: string;
    email: string;
    name?: string;
    displayName: string;
    photoURL?: string;
    isAdmin?: boolean;
}