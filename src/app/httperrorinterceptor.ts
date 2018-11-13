import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(){}

    intercept(request: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(request)
        .pipe(
            catchError((error:HttpErrorResponse)=>{
                let errMsg="";
                if(error.error instanceof ErrorEvent){
                    errMsg=`${error.error.message}`;
                }
                else{
                    if(error.status==0){
                        errMsg="No network detected: Please check your network connection"
                    }else{
                        errMsg=`Error Code: ${error.status}, Message: ${error.message}`
                    }
                }
                alert(errMsg);
                return throwError(error);
            })
        )
    }
}
