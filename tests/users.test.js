const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/messsageModel");

// Mock the entire messageModel module
jest.mock("../models/messsageModel");

describe("Register User Function", () => {
  test("Register user with valid data", async () => {
    // Assuming you need to mock the returned user for successful registration
    User.create.mockResolvedValue({ _id: "mockId", email: "john1097@example.com", role: "Admin" });

    const response = await request(app).post("/api/users/register").send({
      fullName: "John Doe",
      email: "john1097@example.com",
      password: "Strr123@",
      role: "Admin",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("Reject registration with invalid email format", async () => {
    const response = await request(app).post("/api/users/register").send({
      fullName: "John Doe",
      email: "invalidemail",
      password: "StrongPassword123!",
      role: "Admin",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid email format" });
  });

  test("Reject registration with invalid name format", async () => {
    const response = await request(app).post("/api/users/register").send({
      fullName: "John@Doe",
      email: "john.doe@example.com",
      password: "StrongPassword123!",
      role: "Admin",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid name format" });
  });

  test("Reject registration with invalid password format", async () => {
    const response = await request(app).post("/api/users/register").send({
      fullName: "John Doe",
      email: "celestisn1289@gmail.com",
      password: "weakpassword",
      role: "Admin",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Password must contain at least one number and be 6-12 characters long with special characters",
    });
  });
});

describe("Login User Function", () => {
  test("Login with valid credentials", async () => {
    // Assuming you need to mock the returned user for successful login
    User.findOne.mockResolvedValue({ _id: "mockId", email: "admin1@gmail.com", role: "Admin" });

    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "admin1@gmail.com", password: "Test@123" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("Reject login with invalid credentials", async () => {
    // Assuming you need to mock the returned user for failed login
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "invalidPassword" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid credentials" });
  });

  test("Reject login with missing email or password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password are required",
    });

    const response2 = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com" });

    expect(response2.status).toBe(400);
    expect(response2.body).toEqual({
      message: "Email and password are required",
    });
  });
});

describe("Get All Users Function", () => {
  test("Get list of users with valid token and admin role", async () => {
    const mockAdminUser = {
      _id: "mockUserId",
      email: "admin@example.com",
      role: "Admin",
    };

    // Mock the resolved value of User.findById for admin user
    User.findById.mockResolvedValue(mockAdminUser);

    const token = "mockToken";

    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    // Add more assertions as needed...
  });

  test("Reject getting list of users with missing token", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "No token" });
  });

  test("Reject getting list of users with invalid token", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
