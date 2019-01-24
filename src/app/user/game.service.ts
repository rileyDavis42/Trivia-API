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

    getQuestions(data) {
        const categoryID = data['categoryID'];
        const questions = data['questions'];
        const difficulty = data['difficulty'];
        const url = 'https://opentdb.com/api.php?amount=' + questions + '&difficulty=' + difficulty + '&category=' + categoryID;
        return this.http.get(url);
    }
}
