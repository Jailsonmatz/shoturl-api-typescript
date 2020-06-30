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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../database/connection"));
var Generate_1 = __importDefault(require("../utils/Generate"));
var UrlsController = /** @class */ (function () {
    function UrlsController() {
    }
    UrlsController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, hit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default.select('id', 'url', 'hit').from('urls').where('short_url', id).first()];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, response.status(404).send()];
                        }
                        hit = data.hit + 1;
                        return [4 /*yield*/, connection_1.default('urls').where('id', data.id).update('hit', hit)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(301).redirect(data.url)];
                }
            });
        });
    };
    UrlsController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, hit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default.select('id', 'url', 'hit').from('urls').where('id', id).first()];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, response.status(404).send()];
                        }
                        hit = data.hit + 1;
                        return [4 /*yield*/, connection_1.default('urls').where('id', data.id).update('hit', hit)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(301).redirect(data.url)];
                }
            });
        });
    };
    UrlsController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var url, user_id, short_url, validate, id, err_1, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = String(request.body.url);
                        user_id = Number(request.params.user_id);
                        return [4 /*yield*/, Generate_1.default.randomCode()];
                    case 1:
                        short_url = _a.sent();
                        return [4 /*yield*/, connection_1.default.select('id').from('users').where('id', user_id).first()];
                    case 2:
                        validate = _a.sent();
                        if (!validate) {
                            return [2 /*return*/, response.status(400).json('Usuário não encontrado')];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, connection_1.default('urls').insert({ url: url, short_url: short_url, user_id: user_id })];
                    case 4:
                        id = (_a.sent()).toString();
                        return [2 /*return*/, response.json({
                                "id": id,
                                // "hits": 0,
                                "url": url,
                                // "shortUrl": process.env.APP_URL +':'+ process.env.APP_PORT + short_url     
                                "shortUrl": process.env.APP_URL + ":" + process.env.APP_PORT + "/" + short_url
                            })];
                    case 5:
                        err_1 = _a.sent();
                        errorMessage = {};
                        err_1.errno === 1452
                            ?
                                errorMessage = response.status(400).json('Usuário não existe')
                            :
                                errorMessage = response.status(500).json(err_1);
                        return [2 /*return*/, errorMessage];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UrlsController.prototype.destroy = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(request.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, connection_1.default('urls').where('id', id).delete()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(204).send()];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, response.status(500).json(err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UrlsController;
}());
exports.default = UrlsController;
