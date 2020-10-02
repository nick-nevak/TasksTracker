import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable()
export class EmptyStringInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.body) { return next.handle(req); }
    const newBody = { ...req.body };
    for (const [key, val] of Object.entries(newBody)) {
      if (val === '') { newBody[key] = undefined; }
    }
    const reqClone = req.clone({ body: newBody });
    return next.handle(reqClone);

  }
}
