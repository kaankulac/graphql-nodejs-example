import request from 'supertest';
import { app, startServer } from '../../src/index';
import User from '../../src/models/user-model';

describe('Grahql User', () => {
    describe('Query', () => {
        beforeAll(async () => {
            await User.deleteMany({});

            await User.create([
                { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', age: 25, country: 'USA', city: 'New York', profession: 'Software Engineer', salary: 100000 },
                { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com', age: 30, country: 'USA', city: 'New York', profession: 'Software Engineer', salary: 120000 },
                { firstName: 'James', lastName: 'Doe', email: 'jamesdoe@example.com', age: 35, country: 'England', city: 'Manchester', profession: 'Software Engineer', salary: 140000 },
                { firstName: 'Jenny', lastName: 'Doe', email: 'jennydoe@example.com', age: 40, country: 'USA', city: 'New York', profession: 'Janitor', salary: 70000 },
            ])
        })
        test('Should fetch all users', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsers {
                                ID
                                firstName
                                lastName
                                age
                                email
                                country
                                city
                                profession
                                salary
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsers).toHaveLength(4);
        })
        test('Should fetch users by country', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByCountry(country: "England") {
                                ID
                                firstName
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsersByCountry).toHaveLength(1);
        })
        test('Should fetch users by city', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByCity(city: "Manchester") {
                                ID
                                firstName
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsersByCity).toHaveLength(1);
        })
        test('Should fetch users by profession', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByProfession(profession: "Software Engineer") {
                                ID
                                firstName
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsersByProfession).toHaveLength(3);
        })
        test('Should fetch users by min salary', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByMinSalary(salary: 100000) {
                                ID
                                firstName
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsersByMinSalary).toHaveLength(3);
        })
        test('Should fetch users by max salary', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByMaxSalary(salary: 100000) {
                                ID
                                firstName
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsersByMaxSalary).toHaveLength(2);
        })
    });

    describe('Mutation', () => {
        test('Should add a new user', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        mutation {
                            addUser(user: {
                                firstName: "Jack",
                                lastName: "Doe",
                                age: 45,
                                email: "jackdoe@example.com",
                                country: "USA",
                                city: "New York",
                                profession: "Janitor",
                                salary: 80000
                            }) {
                                ID
                                firstName
                                age
                            }
                        }
                    `
                }).expect(200);

            expect(response.body.data.addUser).toHaveProperty('ID');
        })

        test('Should edit a user', async () => {
            const user = await User.findOne({ firstName: 'Jack' });
            if (!user) throw new Error('User not found');
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                mutation {
                  editUser(ID: "${user._id?.toString()}", user: {
                    firstName: "Jack",
                    lastName: "Doe",
                    age: 50,
                    email: "jackdoe@example.com",
                    country: "USA",
                    city: "New York",
                    profession: "Janitor",
                    salary: 80000
                  }) {
                    ID
                    firstName
                    age
                  }
                }
              `
                }).expect(200);
            expect(response.body.data.editUser).toHaveProperty('ID');
        })
    })
});