const { 
  getAllUsers,
  createUser, 
  getUserByEmail, 
  updateUser, 
  deleteUser 
} = require("../service/userService");
const prisma = require("../db/prisma.js");

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
      id: 1, 
      name: "User", 
      email: "user@email.com", 
      password: "password123$"
    });

    const result = await createUser({ 
      name: "User", 
      email: "user@email.com", 
      password: "password123$"
    });

    expect(result.name).toBe("User", );
    expect(result.email).toBe("user@email.com", );
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
});
