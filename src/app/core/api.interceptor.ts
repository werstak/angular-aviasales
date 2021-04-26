import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()

export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `https://front-test.beta.aviasales.ru/${req.url}`;
    const httpsReq = req.clone({
      url
    });
    return next.handle(httpsReq);
  }
}
