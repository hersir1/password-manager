import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	
	constructor(private modalService: ModalService) {
	}
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!request.url.includes('ping')) {
			return next.handle(request).pipe(
				catchError((err: HttpErrorResponse) => {
					this.modalService.createErrorModal(err.error);
					return throwError(err);
				})
			);
		}
		return next.handle(request);
	}
}
