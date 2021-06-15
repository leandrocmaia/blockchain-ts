"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
var ButtonsShowcase = function () { return (<div className="p-1">
    <Button_1.default variant="primary" className="mr-1">
      Primary
    </Button_1.default>
    <Button_1.default variant="secondary" className="mr-1">
      Secondary
    </Button_1.default>
    <Button_1.default variant="success" className="mr-1">
      Success
    </Button_1.default>
    <Button_1.default variant="warning" className="mr-1">
      Warning
    </Button_1.default>
    <Button_1.default variant="danger" className="mr-1">
      Danger
    </Button_1.default>
    <Button_1.default variant="info" className="mr-1">
      Info
    </Button_1.default>
    <Button_1.default variant="light" className="mr-1">
      Light
    </Button_1.default>
    <Button_1.default variant="dark" className="mr-1">
      Dark
    </Button_1.default>
    <Button_1.default variant="link" className="mr-1">
      Link
    </Button_1.default>
  </div>); };
exports.default = ButtonsShowcase;
