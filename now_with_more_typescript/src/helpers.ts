// Interfaces + helper functions
import bcrypt from "bcrypt";

// Interfaces

export interface UserEntry {
  id: string;
  username: string;
  fullname: string;
  password: string;
}

export interface UserDatabase {
  [index: string]: UserEntry;
}

// Functions

export const authenticate = (username: string, password: string, db: UserDatabase) => {
  for (const userId in db) {
    if (db.hasOwnProperty(userId)) {
      const currentUser = db[userId];
      if (currentUser.username === username) {
        if (bcrypt.compareSync(password, currentUser.password)) {
          return { valid: true, id: currentUser.id };
        } else {
          return { valid: false, id: null };
        }
      }
    }
  }
  return { valid: false, id: null };
};
