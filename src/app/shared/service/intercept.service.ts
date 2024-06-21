import { HttpInterceptorFn } from '@angular/common/http';

export const intercept: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('token');

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authToken}`
        }
    });

    return next(authReq);
};