import { createServer, Model } from "miragejs";
import {
  IGetCoursesResponse,
  IPostUserResponse,
  IReview,
} from "src/interfaces/ResponseInterface";
import { mockCourses } from "./data";

export function makeServer({ environment = "test" }) {
  const mockServer = createServer({
    environment,
    logging: true,
    timing: 300,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", {
        id: "123",
        reviews: [],
      });
    },

    routes() {
      this.passthrough();

      // Login
      this.post("/api/v1/user/login", (schema, request) => {
        const user = schema.db.users.findBy({
          id: "123",
        });
        const body = JSON.parse(request.requestBody);
        const res: IPostUserResponse = {
          user: {
            zid: body.zid,
            isAdmin: false,
            bookmarkedCourses: [],
            bookmarkedReviews: [],
            reports: [],
            reviews: [],
          },
          token: {
            expiresIn: "never",
            token: "token-123",
          },
        };

        schema.db.users.update(
          { user: user.id },
          { ...user, user: res, reviews: [] }
        );
        return res;
      });

      // Courses
      this.get("/api/v1/courses", (schema) => {
        const user = schema.db.users.findBy({
          id: "123",
        });
        const res: IGetCoursesResponse = {
          courses: mockCourses,
        };

        schema.db.users.update({ user: user.id }, { ...user, courses: res });
        return res;
      });

      // Reviews
      this.get("/api/v1/reviews", (schema) => {
        const user = schema.db.users.findBy({
          id: "123",
        });
        return user.reviews;
      });

      this.post("/api/v1/reviews", (schema, request) => {
        const user = schema.db.users.findBy({
          id: "123",
        });
        const body = JSON.parse(request.requestBody);
        const res = {
          review: {
            ...body,
            createdTimestamp: new Date(),
            updatedTimestamp: new Date(),
            termTaken: "2020s1",
            upvotes: [],
            reviewId: "rev-123",
          } as IReview,
        };

        schema.db.users.update(
          { user: user.id },
          { ...user, reviews: [...user.reviews, res] }
        );
        return res;
      });
    },
  });

  return mockServer;
}
