import { HttpInterceptorFn } from '@angular/common/http';

export const intercept: HttpInterceptorFn = (req, next) => {
    try {
        const authToken = localStorage.getItem('token');

        if (authToken) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            return next(authReq);
        } else {
            return next(req);
        }
    } catch (error) {
        console.error('Error in interceptor:', error);
        return next(req);
    }
};
