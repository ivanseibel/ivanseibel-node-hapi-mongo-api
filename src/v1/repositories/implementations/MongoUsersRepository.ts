import * as Mongoose from 'mongoose';
import * as Bcrypt from 'bcryptjs';
import { IUsersRepository } from '../IUsersRepository';
import { User } from "../../entities/User";

interface IUserDoc extends Mongoose.Document {
    id: string;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Mongoose.Schema(
    {
        id: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
      timestamps: true
    }
);

function hashPassword(password: string): string {
    if (!password) {
      return null;
    }
  
    return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
}

export class MongoUsersRepository implements IUsersRepository {
    async findByEmail(email: string): Promise<User|null>{
        const userModel: Mongoose.Model<IUserDoc> = Mongoose.model('User', userSchema);
        const userExists = await (userModel.findOne({ email })).exec();

        if (!userExists){
            return null;
        }

        return {...userExists, password: null};
    }

    async save(user: User): Promise<void>{
        const userWithHashPassword = {...user, password: hashPassword(user.password)}
        const userModel = Mongoose.model('User', userSchema);
        await userModel.create(userWithHashPassword);
    }
}
