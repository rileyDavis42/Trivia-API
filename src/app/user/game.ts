import {User} from './user';

export interface Game {
    won: string;
    category: string;
    categoryID: string;
    difficulty: string;
    players: string[];
    questions: Object[];
    questionIndex: number;
    gameID: string;
}
