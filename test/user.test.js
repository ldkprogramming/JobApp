const db = require('../models/db'); // Ensure this path is correct
const User = require('../models/user'); // Ensure this path is correct
const bcrypt = require('bcrypt');

jest.mock('../models/db'); // Mock the db module

describe("User model", () => {
    afterAll(async () => {
        await db.end();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data
    });

    describe("getAll", () => {
        it("should get all users with status 1", async () => {
            const mockResults = [
                {
                    userid: 1,
                    adminid: 1,
                    iduser: 1,
                    email: "user1@example.com",
                    pwd: "hashed_password",
                    lastname: "Doe",
                    firstname: "John",
                    phonenumber: "1234567890",
                    dateofcreation: "2023-01-01",
                    status: 1
                },
                {
                    userid: 2,
                    adminid: null,
                    iduser: null,
                    email: "user2@example.com",
                    pwd: "hashed_password",
                    lastname: "Smith",
                    firstname: "Jane",
                    phonenumber: "0987654321",
                    dateofcreation: "2023-01-02",
                    status: 1
                }
            ];
            db.query.mockResolvedValueOnce([mockResults]);

            const users = await User.getAll();
            expect(users).toEqual(mockResults);
        });
    });

    describe("getAllLikeLastnameOrFirstname", () => {
        it("should get all users whose lastname or firstname matches the search term", async () => {
            const search = "Do";
            const mockResults = [
                {
                    userid: 1,
                    adminid: 1,
                    iduser: 1,
                    email: "user1@example.com",
                    pwd: "hashed_password",
                    lastname: "Doe",
                    firstname: "John",
                    phonenumber: "1234567890",
                    dateofcreation: "2023-01-01",
                    status: 1
                }
            ];
            db.query.mockResolvedValueOnce([mockResults]);

            const users = await User.getAllLikeLastnameOrFirstname(search);
            expect(users).toEqual(mockResults);
        });
    });

    describe("getByEmail", () => {
        it("should get a user by email", async () => {
            const mockResult = {
                id: 1,
                email: "user@example.com",
                pwd: "hashed_password",
                lastname: "Doe",
                firstname: "John",
                phonenumber: "1234567890",
                dateofcreation: "2023-01-01",
                status: 1
            };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const user = await User.getByEmail("user@example.com");
            expect(user).toEqual(mockResult);
        });

        it("should return null if no user is found with the given email", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const user = await User.getByEmail("nonexistent@example.com");
            expect(user).toBeNull();
        });
    });

    describe("getFirstAndLastName", () => {
        it("should get the first name and last name of users with status 1", async () => {
            const mockResults = [
                { firstname: "John", lastname: "Doe" },
                { firstname: "Jane", lastname: "Smith" }
            ];
            db.query.mockResolvedValueOnce([mockResults]);

            const names = await User.getFirstAndLastName();
            expect(names).toEqual(mockResults[0]);
        });
    });

    describe("create", () => {
        it("should create a new user", async () => {
            const email = "newuser@example.com";
            const password = "password";
            const lastName = "Doe";
            const firstName = "John";
            const phoneNumber = "1234567890";
            const dateOfCreation = new Date();
            db.query.mockResolvedValueOnce([{}]);

            await User.create(email, password, lastName, firstName, phoneNumber);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO User VALUES (NULL,?,?,?,?,?,?,1)",
                [email, password, lastName, firstName, phoneNumber, expect.any(Date)]
            );
        });
    });

    describe("getById", () => {
        it("should get a user by ID", async () => {
            const mockResult = {
                id: 1,
                email: "user@example.com",
                pwd: "hashed_password",
                lastname: "Doe",
                firstname: "John",
                phonenumber: "1234567890",
                dateofcreation: "2023-01-01",
                status: 1
            };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const user = await User.getById(1);
            expect(user).toEqual(mockResult);
        });

        it("should return null if no user is found with the given ID", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const user = await User.getById(999);
            expect(user).toBeNull();
        });
    });

    describe("getIdByEmail", () => {
        it("should get the user ID by email", async () => {
            const mockResult = { id: 1 };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const userId = await User.getIdByEmail("user@example.com");
            expect(userId).toBe(1);
        });

        it("should return null if no user is found with the given email", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const userId = await User.getIdByEmail("nonexistent@example.com");
            expect(userId).toBeNull();
        });
    });

    describe("getRolesByEmail", () => {
        it("should get the roles associated with a user by email", async () => {
            const mockResult = {
                id: 1,
                appid: 1,
                recid: null,
                admid: 1
            };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const roles = await User.getRolesByEmail("user@example.com");
            expect(roles).toEqual(["applicant", "admin"]);
        });

        it("should return an empty array if no roles are found for the given email", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const roles = await User.getRolesByEmail("nonexistent@example.com");
            expect(roles).toEqual([]);
        });
    });

    describe("getRolesIdMapByEmail", () => {
        it("should get the roles ID map associated with a user by email", async () => {
            const mockResult = {
                id: 1,
                applicantId: 1,
                recruiterId: 1,
                adminId: 1
            };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const rolesIdMap = await User.getRolesIdMapByEmail("user@example.com");
            expect(rolesIdMap).toEqual(mockResult);
        });

        it("should return null if no roles ID map is found for the given email", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const rolesIdMap = await User.getRolesIdMapByEmail("nonexistent@example.com");
            expect(rolesIdMap).toBeNull();
        });
    });

    describe("isLoginValid", () => {
        it("should return true if the login credentials are valid", async () => {
            const mockResult = {
                email: "user@example.com",
                pwd: await bcrypt.hash("password", 10)
            };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const isValid = await User.isLoginValid("user@example.com", "password");
            expect(isValid).toBe(true);
        });

        it("should return false if the login credentials are invalid", async () => {
            const mockResult = {
                email: "user@example.com",
                pwd: await bcrypt.hash("password", 10)
            };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const isValid = await User.isLoginValid("user@example.com", "wrongpassword");
            expect(isValid).toBe(false);
        });

        it("should return false if the user does not exist", async () => {
            db.query.mockResolvedValueOnce([[]]);

            const isValid = await User.isLoginValid("nonexistent@example.com", "password");
            expect(isValid).toBe(false);
        });
    });

    describe("giveAdminRight", () => {
        it("should grant admin rights to a user", async () => {
            const iduser = 1;
            db.query.mockResolvedValueOnce([{}]);

            await User.giveAdminRight(iduser);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO Admin VALUES (NULL, ?)",
                [iduser]
            );
        });
    });

    describe("deleteUser", () => {
        it("should set the status of a user to 0", async () => {
            const iduser = 1;
            db.query.mockResolvedValueOnce([{}]);

            await User.deleteUser(iduser);
            expect(db.query).toHaveBeenCalledWith(
                "UPDATE User SET status = 0 WHERE id = ?",
                [iduser]
            );
        });
    });

});
