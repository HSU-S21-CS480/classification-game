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
const Database_1 = __importDefault(require("../models/Database"));
const questionHeaders = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    "Cras eget leo ut leo maximus venenatis interdum non urna?",
    "Nunc lobortis pellentesque vulputate. Duis in augue non nisl euismod efficitur?",
    "Vestibulum elementum molestie aliquet?",
    "Sed est metus, posuere vel pharetra id, dapibus non magna?",
];
const questionDescriptions = [
    "Quisque luctus diam nec tellus congue volutpat eget id orci. Etiam pharetra imperdiet nulla et mattis. Fusce in molestie lorem. Curabitur facilisis magna id ornare ullamcorper. Aenean imperdiet dignissim risus vel porttitor. Vestibulum rutrum scelerisque tortor, nec pellentesque magna pellentesque eu. In pharetra mauris non cursus lacinia. Vivamus interdum lectus sit amet commodo convallis. Donec eget placerat elit.",
    "Vivamus quis lacinia erat. Proin aliquam eros a nisi consequat porttitor. Morbi maximus blandit bibendum. Fusce vitae dolor vel tortor sagittis mollis at non leo. Suspendisse volutpat quam nec mi congue aliquet. Quisque dignissim molestie turpis ac tempor. Suspendisse ac orci ullamcorper, faucibus risus et, maximus nibh.",
    "Nullam venenatis egestas enim, placerat ullamcorper lacus mollis ac. Aenean vel ultricies elit. Duis ac tellus at justo gravida malesuada. Donec condimentum efficitur neque ac ullamcorper. Nulla mauris quam, fringilla ut mi ac, posuere ullamcorper sapien. Maecenas ut massa et eros volutpat sollicitudin sit amet et urna. ",
    "Pellentesque tempor, nibh nec lobortis vehicula, turpis risus gravida enim, non dignissim justo purus id magna. Praesent euismod, neque eu varius tincidunt, est sem maximus purus, a rhoncus felis massa eget purus. Duis sit amet diam felis. Morbi in orci efficitur arcu auctor varius. Integer ut ipsum risus. Fusce at dapibus mi. Praesent et efficitur sem, sed congue risus. Ut maximus orci eu augue rhoncus mattis.",
    "Aenean leo arcu, placerat eu mauris non, vulputate consectetur nibh. Cras massa est, interdum at convallis nec, ullamcorper eget turpis. Duis sed hendrerit eros. ",
    "Nunc malesuada, massa vitae rutrum lacinia, tellus orci egestas est, a accumsan arcu magna et turpis. Maecenas eu sem euismod, vestibulum nisi ut,",
    "Aenean imperdiet dignissim risus vel porttitor. Vestibulum rutrum scelerisque tortor, nec pellentesque magna pellentesque eu. In pharetra mauris non cursus lacinia. Vivamus interdum lectus sit amet commodo convallis. Donec eget placerat elit.",
    "Quisque sit amet nunc vitae lacus fringilla lobortis. Suspendisse luctus luctus diam ut imperdiet. Vestibulum elementum molestie aliquet. Sed est metus, posuere vel pharetra id, dapibus non magna. Etiam velit magna, tristique a molestie at, cursus ut metus."
];
const userChoices = [
    { 1: "one", 2: "two", 3: "three", 4: "four", 5: "five" },
    { 1: "Yes", 2: "No" },
    { 0: "Never", 1: "Very little", 2: "Somewhat", 3: "A lot" }
];
//define all routes
const question = (router) => {
    router.get('/question', getQuestion);
};
const db = new Database_1.default('../data/QuestionDb.db');
//returns a random question
const getQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield ((_a = db.Questions) === null || _a === void 0 ? void 0 : _a.get(1));
    const header = questionHeaders[Math.floor(Math.random() * questionHeaders.length)];
    const description = questionDescriptions[Math.floor(Math.random() * questionDescriptions.length)];
    const choices = userChoices[Math.floor(Math.random() * userChoices.length)];
    const question = {
        questionHeader: header,
        questionDescription: description,
        userChoices: choices
    };
    res.json({ question });
});
exports.default = question;
//# sourceMappingURL=question.js.map