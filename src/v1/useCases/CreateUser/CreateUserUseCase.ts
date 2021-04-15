import { IMailAdapter } from '../../adapters/IMailAdapter';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserRequestsDTO } from './CreateUserDTO';

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailAdapter: IMailAdapter
    ){}

    async execute(data: CreateUserRequestsDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = new User(data);
        await this.usersRepository.save(user);

        await this.mailAdapter.sendMail({
            from: {
                email: 'team@myapp.com',
                name: 'Team',
            },
            to: {
                email: user.email,
                name: user.name,
            },
            subject: 'Welcome to our platform',
            body: `<p>Hi ${user.name}, welcome to our platform</p>`
        })
    }
}