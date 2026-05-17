export type UserRole = "admin" | "sales";
export interface AuthTokenPayload {
    sub: string;
    email: string;
    role: UserRole;
}
export interface SafeUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
