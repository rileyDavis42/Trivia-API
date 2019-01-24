import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    categoriesUrl = 'https://opentdb.com/api_category.php';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<any> {
        return this.http.get(this.categoriesUrl);
    }
}
