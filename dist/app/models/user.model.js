"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name must be given"],
        trim: true,
        minlength: [3, "Name must be atleast 3 characters longer"],
        maxlength: [40, "Name must be in 40 characters"],
    },
    email: {
        type: String,
        required: [true, "Email must be given"],
        unique: [true, "Email is already taken"],
        lowercase: true,
        validate: [validator_1.default.isEmail, "Invalid email"],
    },
    password: {
        type: String,
        required: [true, "Password not given"],
        minlength: [6, "Password must be atleast 6 characters"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, { versionKey: false, timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
    });
});
userSchema.static("isExist", function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.Users.findOne({ email });
        if (!user) {
            throw {
                success: false,
                name: "ValidationError",
                message: "Check email or password",
            };
        }
        const what = yield bcryptjs_1.default.compare(password, user.password);
        if (!what) {
            throw {
                name: "ValidationError",
                message: "Password is wrong!",
                success: false,
            };
        }
        return user;
    });
});
exports.Users = (0, mongoose_1.model)("Users", userSchema);
