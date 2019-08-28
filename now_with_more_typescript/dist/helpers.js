"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Interfaces + helper functions
const bcrypt_1 = __importDefault(require("bcrypt"));
// Functions
exports.authenticate = (username, password, db) => {
    for (const userId in db) {
        if (db.hasOwnProperty(userId)) {
            const currentUser = db[userId];
            if (currentUser.username === username) {
                if (bcrypt_1.default.compareSync(password, currentUser.password)) {
                    return { valid: true, id: currentUser.id };
                }
                else {
                    return { valid: false, id: null };
                }
            }
        }
    }
    return { valid: false, id: null };
};
