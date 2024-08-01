"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const product_1 = __importDefault(require("./product"));
const category_1 = __importDefault(require("./category"));
const cart_1 = __importDefault(require("./cart"));
const cartItem_1 = __importDefault(require("./cartItem"));
const order_1 = __importDefault(require("./order"));
const orderItem_1 = __importDefault(require("./orderItem"));
const patient_1 = __importDefault(require("./patient"));
const department_1 = __importDefault(require("./department"));
const doctor_1 = __importDefault(require("./doctor"));
const appointment_1 = __importDefault(require("./appointment"));
const test_1 = __importDefault(require("./test"));
const labRequest_1 = __importDefault(require("./labRequest"));
const labRequestItem_1 = __importDefault(require("./labRequestItem"));
const manager_1 = __importDefault(require("./manager"));
const employee_1 = __importDefault(require("./employee"));
const hrRecord_1 = __importDefault(require("./hrRecord"));
const superAdmin_1 = __importDefault(require("./superAdmin"));
const content_1 = __importDefault(require("./content"));
const models = {
    User: user_1.default,
    Product: product_1.default,
    Category: category_1.default,
    Cart: cart_1.default,
    CartItem: cartItem_1.default,
    Order: order_1.default,
    OrderItem: orderItem_1.default,
    Patient: patient_1.default,
    Department: department_1.default,
    Doctor: doctor_1.default,
    Appointment: appointment_1.default,
    Test: test_1.default,
    LabRequest: labRequest_1.default,
    LabRequestItem: labRequestItem_1.default,
    Manager: manager_1.default,
    Employee: employee_1.default,
    HRRecord: hrRecord_1.default,
    SuperAdmin: superAdmin_1.default,
    Content: content_1.default,
};
exports.default = models;
