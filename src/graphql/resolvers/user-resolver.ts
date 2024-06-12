import User, { IUser } from "../../models/user-model";
import { IGqlUser, IUserResolver } from "../types";

const userResolver: IUserResolver = {
    Query: {
        getUser: async (_: any, { ID }: { ID: string }) => {
            const user = await User.findById(ID);
            if (!user) return null;
            const { _id, ...rest } = user.toObject();
            return { ID: _id, ...rest } as IGqlUser;
        },
        getUsers: async () => {
            const users = await User.find();
            return users.map(user => {
                const { _id, ...rest } = user.toObject();
                return { ID: _id, ...rest } as IGqlUser;
            });
        },
        getUsersByCountry: async (_: any, { country }: { country: string }) => {
            const user = await User.find({ country });
            return user.map(user => {
                const { _id, ...rest } = user.toObject();
                return { ID: _id, ...rest } as IGqlUser;
            })
        },
        getUsersByCity: async (_: any, { city }: { city: string }) => {
            const user = await User.find({ city });
            return user.map(user => {
                const { _id, ...rest } = user.toObject();
                return { ID: _id, ...rest } as IGqlUser;
            })
        },
        getUsersByProfession: async (_: any, { profession }: { profession: string }) => {
            const user = await User.find({ profession });
            return user.map(user => {
                const { _id, ...rest } = user.toObject();
                return { ID: _id, ...rest } as IGqlUser;
            })
        },
        getUsersByMinSalary: async (_: any, { salary }: { salary: number }) => {
            const user = await User.find({ salary: { $gte: salary } });
            return user.map(user => {
                const { _id, ...rest } = user.toObject();
                return { ID: _id, ...rest } as IGqlUser
            })
        },
        getUsersByMaxSalary: async (_: any, { salary }: { salary: number }) => {
            const user = await User.find({ salary: { $lte: salary } });
            return user.map(user => {
                const { _id, ...rest } = user.toObject();
                return { ID: _id, ...rest } as IGqlUser
            })
        }
    },
    Mutation: {
        addUser: async (_: any, { user }: { user: IGqlUser }) => {
            const newUser = await User.create(user);
            const { _id, ...rest } = newUser.toObject();
            return { ID: _id, ...rest } as IGqlUser;
        },
        editUser: async (_: any, { ID, user }: { ID: string, user: IUser }) => {
            const updatedUser = await User.findByIdAndUpdate(ID, user, { new: true });
            if (!updatedUser) return null;
            const { _id, ...rest } = updatedUser.toObject();
            return { ID: _id, ...rest } as IGqlUser;
        }
    }
}

export default userResolver;