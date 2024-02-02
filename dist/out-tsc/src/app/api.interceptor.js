import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let ApiInterceptor = class ApiInterceptor {
    intercept(req, next) {
        const intercept = req.clone({ url: "/api" + req.url });
        if (req.headers && !req.headers.keys().includes("Content-Type")) {
            req.headers.append("Content-Type", "application/json; charset=utf-8");
        }
        return next.handle(intercept);
    }
};
ApiInterceptor = __decorate([
    Injectable()
], ApiInterceptor);
export { ApiInterceptor };
//# sourceMappingURL=api.interceptor.js.map