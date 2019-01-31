import {User} from './user';

export interface Game {
    won: boolean;
    category: string;
    categoryID: string;
    difficulty: string;
    players: User[];
    questions: Object[];
    questionIndex: number;
    gameID: string;
}
