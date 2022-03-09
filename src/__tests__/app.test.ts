import supertest from "supertest";
import app from "../app";
import mongoose from "mongoose";

let token: string;
let authorId: string;
let bookId: string;
let ID: string;

const loginData = {
  firstName: "hassan",
  email: "odud@gmail.com",
  password: "1234",
};

describe("POST /signup", () => {
  it("return status code 201", async () => {
    const res = await supertest(app).post("/users/signup").send(loginData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("Account created");
    // done()
  });

  test("login", async () => {
    const response = await supertest(app)
      .post("/users/login")
      .send({ email: loginData.email, password: loginData.password });
    token = response.body.token;
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.loginStatus).toBe("Access Granted");
  });
});


afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

// deletedata()
