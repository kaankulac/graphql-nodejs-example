import request from 'supertest';
import { app, startServer } from '../../src/index';
import User from '../../src/models/user-model';

describe('Grahql User', () => {
    describe('Query', () => {
        beforeAll(async () => {
            await User.create([
                {firstName: 'John', lastName: 'Doe', age: 25, country: 'USA', city: 'New York', profession: 'Software Engineer', salary: 100000},
                {firstName: 'Jane', lastName: 'Doe', age: 30, country: 'USA', city: 'New York', profession: 'Software Engineer', salary: 120000},
                {firstName: 'James', lastName: 'Doe', age: 35, country: 'England', city: 'Manchester', profession: 'Software Engineer', salary: 140000},
                {firstName: 'Jenny', lastName: 'Doe', age: 40, country: 'USA', city: 'New York', profession: 'Janitor', salary: 70000},
            ])
        })

        afterAll(async () => {
            await User.deleteMany({});
        })
        test('Should fetch all users', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsers {
                                ID
                                name
                                age
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
                            getUsersByCountry(country: "england") {
                                ID
                                name
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsers).toHaveLength(1);
        })
        test('Should fetch users by city', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByCity(city: "manchester") {
                                ID
                                name
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsers).toHaveLength(1);
        })
        test('Should fetch users by profession', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByProfession(profession: "Software Engineer") {
                                ID
                                name
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsers).toHaveLength(3);
        })
        test('Should fetch users by min salary', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByMinSalary(salary: 100000) {
                                ID
                                name
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsers).toHaveLength(3);
        })
        test('Should fetch users by max salary', async () => {
            const response = await request(app)
                .post('/graphql')
                .send({
                    query: `
                        query {
                            getUsersByMaxSalary(salary: 100000) {
                                ID
                                name
                                age
                            }
                        }
                    `
                })
                .expect(200);
            expect(response.body.data.getUsers).toHaveLength(2);
        })
    });

    describe('Mutation', () => {

    })
});