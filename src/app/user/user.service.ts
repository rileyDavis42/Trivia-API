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
        return this.usersRef.valueChanges();
    }

    registerUser( user: User ) {
        const newUserRef: AngularFireObject<any> = this.db.object('Users/' + user.id);
        newUserRef.update(user)
            .then(_ => console.log('User has successfully been added...'))
            .catch(error => console.log('Error adding user to database...', error));
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
}
