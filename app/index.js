"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require("koa-logger");

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _router = require("./router.js");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();

app.use((0, _koaLogger2.default)()).use(_router2.default.routes()).use(_router2.default.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("app is running at port " + PORT);
});