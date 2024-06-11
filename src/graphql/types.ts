import { IUser } from "../models/user-model";

export interface IGqlUser extends IUser {
    ID: string;
}

export interface IUserResolver {
    Query: {
        getUser: (_: any, {ID}: {ID: string}) => Promise<IGqlUser | null>,
        getUsers: () => Promise<IGqlUser[]>,
        getUsersByCountry: (_: any, {country}: {country: string}) => Promise<IGqlUser[]>,
        getUsersByCity: (_: any, {city}: {city: string}) => Promise<IGqlUser[]>,
        getUsersByProfession: (_: any, {profession}: {profession: string}) => Promise<IGqlUser[]>,
        getUsersByMinSalary: (_: any, {salary}: {salary: number}) => Promise<IGqlUser[]>,
        getUsersByMaxSalary: (_: any, {salary}: {salary: number}) => Promise<IGqlUser[]>,
    };

    Mutation: {
        addUser: (_: any, {user}: {user: IGqlUser}) => Promise<IGqlUser>;
        editUser: (_: any, {ID, user}: {ID: string, user: IUser}) => Promise<IGqlUser | null>;
    };
}