import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from 'graphql';
import { Users } from '../../Entities/Users';
import { UserType } from '../typeDefs/User';
import bcrypt from 'bcryptjs';
import { MessageType } from '../typeDefs/Message';

export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async (_: any, args: any) => {
        const { name, username, password } = args;
        const encrypyPassword = await bcrypt.hash(password, 10);
        const result = await Users.insert({
            name,
            username,
            password: encrypyPassword
        });

        return {
            ...args,
            id: result.identifiers[0].id,
            password: encrypyPassword
        };
    }
};

export const DELETE_USER = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_: any, { id }: any) {
        const result = await Users.delete(id);
        return result.affected === 1;
    }
};

export const UPDATE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        input: {
            type: new GraphQLInputObjectType({
                name: 'UserInput',
                fields: {
                    name: { type: GraphQLString },
                    username: { type: GraphQLString },
                    oldPassword: { type: GraphQLString },
                    newPassword: { type: GraphQLString }
                }
            })
        }
    },
    async resolve(_: any, { id, input }: any) {
        const userFounds = await Users.findOne({ where: { id } });
        let message = 'User not found';
        if (userFounds) {
            const isMatch = await bcrypt.compare(input.oldPassword, userFounds.password);
            if (isMatch) {
                const newPasswordHast = await bcrypt.hash(input.newPassword, 10);
                const result = await Users.update({ id }, { username: input.username, name: input.name, password: newPasswordHast });
                return {
                    success: result.affected === 1,
                    message: 'User update successfully'
                };
            }
            message = 'Old password is incorrect';
        }
        return {
            success: false,
            message
        };
    }
};
