import { Game } from './game';

export interface User {
    id: string;
    name: string;
    email: string;
    logo: string;
    games: Game[];
}
