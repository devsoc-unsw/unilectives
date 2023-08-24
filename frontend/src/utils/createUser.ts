import { post } from "./request";

export async function createUser(zid: string) {
  await post("/user/register", { zid, isAdmin: false });
  console.log("Passed through user registration");
}
