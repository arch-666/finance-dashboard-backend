import prisma from "../lib/prisma.js";
import { hasher } from "./hash.js";
async function createAdmin() {
  const hashed = await hasher("admin");
  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashed,
      role: "ADMIN",
      isActive: true,
      name: "admin",
    },
  });
}
createAdmin();
