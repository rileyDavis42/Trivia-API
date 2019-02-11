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

    strParse(txt: string): string {
        const findQuotes = RegExp('&#039;', 'g');
        const findQuotes2 = RegExp('&quot;', 'g');
        const findQuotes3 = RegExp('&rsquo;', 'g');
        const findAnd = RegExp('&amp;', 'g');
        const findE = RegExp('&eacute;', 'g');
        const findE2 = RegExp('&Eacute;', 'g');
        const findN = RegExp('&ntilde;', 'g');
        const findA = RegExp('&aacute;', 'g');
        const findO = RegExp('&ograve;', 'g');
        const findDeg = RegExp('&deg;', 'g');
        const findOcirc = RegExp('&ocirc;', 'g');
        const findUuml = RegExp('&uuml;', 'g');
        const findOacute = RegExp('&oacute;', 'g');
        txt = txt.replace( findQuotes, '\'');
        txt = txt.replace( findQuotes2, '\'');
        txt = txt.replace( findQuotes3, '\'');
        txt = txt.replace( findAnd, '&');
        txt = txt.replace( findE, 'é' );
        txt = txt.replace( findE2, 'é' );
        txt = txt.replace( findN, 'ñ' );
        txt = txt.replace( findA, 'á' );
        txt = txt.replace( findO, 'ò' );
        txt = txt.replace(findDeg, 'º');
        txt = txt.replace(findOcirc, 'ô');
        txt = txt.replace(findUuml, 'ü');
        txt = txt.replace( findOacute, 'ó' );
        return txt;
    }
    saveWinner(gameID: string, winners: Array<string>){
        this.db.object('/Game/' + gameID)
            .update({won: winners})
    }
}
