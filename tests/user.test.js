const { 
  getAllUsers,
  createUser, 
  getUserByEmail, 
  updateUser, 
  deleteUser 
} = require("../service/userService");
const prisma = require("../db/prisma.js");

const request = require("supertest");
const server = require("../server");

jest.mock("../db/prisma.js", () => ({
  user: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("User tests", () => {
  it("should be return all users", async () => {
    prisma.user.findMany.mockResolvedValue([
      { 
        id: 1, 
        name: "User1", 
        email: "user1@email.com", 
        password: "passwordtest123" 
      },
      { 
        id: 2, 
        name: "User2", 
        email: "user2@email.com", 
        password: "passwordtest321" 
      },
    ]);

    const result = await getAllUsers();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe("User1");
    expect(result[1].name).toBe("User2");
  });

  it("should be return user by email successfully", async () => {
    prisma.user.findFirst.mockResolvedValue({ 
        id: 1, 
        name: "User",
        email: "user@email.com", 
        password: "password123$" 
      });

    const result = await getUserByEmail("user@email.com");

    expect(result.name).toBe("User");
    expect(result.email).toBe("user@email.com");
  });

  it("should be created a new user successfully", async () => {

    prisma.user.create.mockResolvedValue({
      name: "teste",
      email: "teste@email.com"
    });

    const response = await request(server)
      .post('/user')
      .send({
        name: "teste",
        email: "teste@email.com",
        password: "Password123$"
      });

    expect(response.body.name).toBe("teste");
    expect(response.body.email).toBe("teste@email.com");
    expect(response.body.password).toBeUndefined();
  });

  it("should be updating user successfully", async () => {

    prisma.user.update.mockResolvedValue({ 
      id: 1, 
      name: "User", 
      email: "user@email.com", 
      password: "password123$"
    });

    const result = await updateUser(1, { 
      name: "User", 
      email: "user@email.com", 
      password: "password123$"
    });

    expect(result.name).toBe("User");
    expect(result.email).toBe("user@email.com", );
  });

  it("should be deleting user successfully", async () => {

    prisma.user.delete.mockResolvedValue({ 
      id: 1, 
      name: "User", 
      email: "user@email.com", 
      password: "password123$" 
    });

    const result = await deleteUser(1);

    expect(result.name).toBe("User");
    expect(result.email).toBe("user@email.com");
  });

  it("should be return http status 401 when login is invalid", async() => {
    const response = await request(server)
      .post("/login")
      .send({
        "email": "user@email.com",
        "password": "password123$"
      })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe("Not Authorized")
  });

  it('should be return http status 200 when login is valid', async () => { 
    prisma.user.findFirst.mockResolvedValue({ 
      id: 1, 
      name: "teste",
      email: "teste@email.com", 
      password: "$2b$10$IHbelqK6sWbASKk4.ZSCnO98/nZfouRW4cxC8gzYqPFubhJDMom96" 
    });
    process.env.SECRET="SECRET_TEST";

    const response = await request(server)
      .post('/login')
      .send({
        email: "teste@email.com",
        password: "Password123$"
      });

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty("token")
   });

});
