"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    app.get("/dev/showcase", function (req, res) {
        res.render("showcase.ejs");
    });
}
exports.default = default_1;
