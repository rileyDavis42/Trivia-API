import {User} from './user';

export interface Game {
    won: boolean;
    category: string;
    difficulty: string;
    players: User[];
    questions: boolean[];
}
