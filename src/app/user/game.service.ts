import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    categoriesUrl = 'https://opentdb.com/api_category.php';

    constructor( private http: HttpClient, private db: AngularFireDatabase ) {}

    getCategories(): Observable<any> {
        return this.http.get(this.categoriesUrl);
    }

    getQuestions( data ) {
        const categoryID = data['categoryID'];
        const questions = data['questions'];
        const difficulty = data['difficulty'];
        const url = 'https://opentdb.com/api.php?amount=' + questions + '&difficulty=' + difficulty + '&category=' + categoryID;
        return this.http.get(url);
    }

    answerQuestion(userID: string, gameID: string, questionIndex: number, correct: boolean) {
        this.db.object('/Users/' + userID + '/Games/Current Games/' + gameID + '/questions/' + questionIndex + '')
            .update( {'correct': correct} )
            .then(_ => console.log(gameID));
    }
}
