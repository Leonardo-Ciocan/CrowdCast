var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path='../typing/react.d.ts' />
var React = require('react');
var ReactDOM = require('react-dom');
var MainPage = (function (_super) {
    __extends(MainPage, _super);
    function MainPage() {
        _super.apply(this, arguments);
    }
    MainPage.prototype.render = function () {
        return React.createElement("div", null, React.createElement("h1", null, "Hello world"));
    };
    return MainPage;
})(React.Component);
ReactDOM.render(MainPage, document.getElementById("root"));
//# sourceMappingURL=MainPage.js.map