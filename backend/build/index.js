"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const workout_js_1 = __importDefault(require("./routes/workout.js"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({ origin: '*' }));
app.use(body_parser_1.default.json());
app.use('/workout', workout_js_1.default);
app.get('/', (req, res) => res.send('hello homepage'));
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map