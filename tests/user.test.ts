import 'jest';
import User from '../src/database/models/User';

import * as dbHandler from './mockdb';

beforeAll(async () => {
    await dbHandler.connect()
});

afterEach(async () => {
    await dbHandler.clearDatabase()
});

afterAll(async () => {
    await dbHandler.closeDatabase()
});

describe('user test', () => {
    it('can be created correctly', async () => {
        // expect that five assertions will be made
        expect.assertions(5)
        // create new user model instance
        const user = await User.create({
            firstName: 'Harry',
            username: 'harrypotter',
            email: 'harry@potter.test',
            password: '12345678',
            isAdmin: false
        })
        await user.save()

        // find inserted user by username
        const userInDb = await User.findOne({username: 'harrypotter'}).exec()
        console.log('User document from memory-db', userInDb)
        
        // check that first name is expected
        expect(userInDb.firstName).toEqual('Harry')
        // check that username is expected
        expect(userInDb.username).toEqual('harrypotter')
        // check that email is expected
        expect(userInDb.email).toEqual('harry@potter.test')
        // check that password is hashed expected
        expect(userInDb.password).not.toEqual('12345678')
        // check that role is expected
        expect(userInDb.isAdmin).toEqual(false)
    });
});