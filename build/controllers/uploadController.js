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
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folderPath = path_1.default.join(__dirname, '..', 'uploads');
    if (!fs_1.default.existsSync(folderPath)) {
        yield promises_1.default.mkdir(folderPath);
    }
    const form = (0, formidable_1.default)({
        uploadDir: folderPath,
        keepExtensions: true,
        maxFileSize: 1024 * 1024,
        multiples: false
    });
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            res.status(500).json({ "message": err.message });
        res.status(201).json({ files });
        res.end();
    }));
});
module.exports = { uploadFile };
