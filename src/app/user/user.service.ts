import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { User } from './user';
import { Observable } from 'rxjs';
import { Game } from './game';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    usersRef: AngularFireObject<any>;

    constructor( private db: AngularFireDatabase ) {
        this.usersRef = this.db.object('Users');
        this.usersRef.valueChanges().subscribe(data => this.usersRef = data);
    }

    getAllUsers() {
        this.usersRef = this.db.object('Users');
        return this.usersRef.valueChanges();
    }

    registerUser( user: User ) {
        const newUserRef: AngularFireObject<any> = this.db.object('Users/' + user.id);
        newUserRef.update(user)
            .catch(error => console.log('Error singing in...', error));
    }

    getGames( userID: string ): Observable<any> {
        return this.db.object('Users/' + userID + '/Games/Current Games/').valueChanges();
    }

    startNewGame( user: User, game: Game ): string {
        const key = Math.round(Math.random() * 1000000);
        const gameRef = this.db.object('Users/' + user.id + '/Games/Current Games/' + key);
        gameRef.update(game)
            .then(_ => console.log('Successfully created game...'))
            .catch(error => console.log('Error creating game...', error));
        return String(key);
    }

    updateUser( userID: string, gameID: string ) {
        this.db.object('Users/' + userID + '/Games/Current Games/' + gameID).valueChanges().subscribe(game => {
            let score = 0;
            const questions: Object[] = game['questions'];
            for (let i = 0; i < questions.length; i++) {
                if (questions[i]['correct']) {
                    score += 1;
                }
            }
            score /= questions.length;
            return score;
        });
    }

    discardGame( userID: string, gameID: string ) {
        this.db.object('Users/' + userID + '/Games/Current Games/' + gameID).remove()
            .then(_ => console.log('Successfully removed game...'))
            .catch(error => console.log('Error removing game...', error));
    }
}
