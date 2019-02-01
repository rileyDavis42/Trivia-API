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


    getCategoryAnswerCount(catID: string) {
        const url = 'https://opentdb.com/api_count.php?category=' + catID;
        return this.http.get(url);
    }

    getQuestions( data ) {
        const categoryID = data['categoryID'];
        const questions = data['questions'];
        const difficulty = data['difficulty'];
        const url = 'https://opentdb.com/api.php?amount=' + questions + '&difficulty=' + difficulty + '&category=' + categoryID;
        return this.http.get(url);
    }

    answerQuestion(gameID: string, questionIndex: number, correct: boolean ) {
        this.db.object('/Game/' + gameID)
            .update( {'questionIndex': questionIndex + 1} )
            .then(_ => { });

        this.db.object('/Game/' + gameID + '/questions/' + questionIndex)
            .update( {'correct': correct} )
            .then(_ => { });
    }
}
