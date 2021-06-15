"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Toast_1 = __importDefault(require("react-bootstrap/Toast"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var ToastsShowcase = function () {
    var _a = react_1.useState(true), show = _a[0], toggleShow = _a[1];
    return (<>
      {!show && <Button_1.default onClick={function () { return toggleShow(true); }}>Show Toast</Button_1.default>}
      {/*
      // @ts-ignore */}
      <Toast_1.default show={show} onClose={function () { return toggleShow(false); }}>
        <Toast_1.default.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt=""/>
          <strong className="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast_1.default.Header>
        <Toast_1.default.Body>Hello, world! This is a toast message.</Toast_1.default.Body>
      </Toast_1.default>
    </>);
};
exports.default = ToastsShowcase;
