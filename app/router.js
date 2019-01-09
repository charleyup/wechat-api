"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index = require("./constroller/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

router.get("/", _index2.default.index);
exports.default = router;