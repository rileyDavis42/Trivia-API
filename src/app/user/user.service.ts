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

    getPlayerData( userID ): Observable<any> {
        return this.db.object('Users/' + userID).valueChanges();
    }

    registerUser( user: User ) {
        const newUserRef: AngularFireObject<any> = this.db.object('Users/' + user.id);
        newUserRef.update(user)
            .catch(error => console.log('Error singing in...', error));
    }

    getGames(): Observable<any> {
        return this.db.object('/Game/').valueChanges();
    }

    startNewGame(game: Game ): string {
        const key = Math.round(Math.random() * 1000000);
        const gameRef = this.db.object('Game/' + key);
        gameRef.update(game)
            .then(_ => console.log('Successfully created game...'))
            .catch(error => console.log('Error creating game...', error));
        return String(key);
    }

    discardGame( gameID: string ) {
        this.db.object( '/Game/' + gameID).remove()
            .then(_ => console.log('Successfully removed game...'))
            .catch(error => console.log('Error removing game...', error));
    }
}
