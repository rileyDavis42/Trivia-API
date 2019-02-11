import {User} from './user';

export interface Game {
    won: Array<string>;
    category: string;
    categoryID: string;
    difficulty: string;
    players: string[];
    numOfPlayers: number;
    questions: Object[];
    questionIndex: number;
    gameID: string;
}
