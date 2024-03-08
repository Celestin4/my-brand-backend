const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/messsageModel");

jest.mock("../models/messsageModel");

describe("Register User Function", () => {
  test("Register user with valid data", async () => {
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
      message:
        "Password must contain at least one number and be 6-12 characters long with special characters",
    });
  });
});

describe("Login User Function", () => {
  test("Login with valid credentials", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "admin1@gmail.com", password: "Test@123" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test("Reject login with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "invalidPassword" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid credentials" });
  });

  test("Reject login with missing email or password", async () => {
    let response = await request(app)
      .post("/api/users/login")
      .send({ password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email and password are required",
    });

    response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
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

    User.findById.mockResolvedValue(mockAdminUser);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU5ZGRhOTEwOThmMjFiMjc3NDc2ZTUiLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MDk4MjY4NzAsImlzcyI6Im50ZXppcnlvLm5ldGxpZnkuYXBwIiwiZXhwIjoxNzA5ODMwNDcwfQ.PYIodIegHWHt1d33cLaRVz69nCMAxOOxmFSJq-apXp4"

    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
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

  // Add more tests as needed for different scenarios, such as testing for non-admin users
});
