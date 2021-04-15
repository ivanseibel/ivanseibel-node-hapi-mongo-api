import { MailTrapMailAdapter } from "../../adapters/implementations/MailTrapMailAdapter";
import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const mailTrapMailAdapter = new MailTrapMailAdapter();

const createUserUseCase = new CreateUserUseCase(
    mongoUsersRepository,
    mailTrapMailAdapter
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserController }