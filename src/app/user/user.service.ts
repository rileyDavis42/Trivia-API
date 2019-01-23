import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    usersRef: AngularFireObject<any>;

    constructor(private db: AngularFireDatabase) {
        this.usersRef = this.db.object('Users');
        this.usersRef.valueChanges().subscribe(data => this.usersRef = data);
    }

    getAllUsers() {
        return this.usersRef.valueChanges();
    }

    registerUser(username: string, password: string) {
        const userCheck: AngularFireObject<any> = this.db.object('Users/' + username);
        userCheck.valueChanges().subscribe(data => {
            if (data) {
                alert('Username taken!');
            } else {
                const newUser = {
                    username: username,
                    data: {
                        password: password
                    }
                };
                const newUserRef: AngularFireObject<any> = this.db.object('Users/' + username);
                newUserRef.update(newUser)
                    .then(_ => console.log('User has successfully been added...'))
                    .catch(error => console.log('Error adding user to database...', error));
                return;
            }
        });
    }
}
