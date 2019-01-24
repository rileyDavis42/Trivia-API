import { Game } from './game';

export interface User {
<<<<<<< HEAD
    name: string;
    email: string;
    log: string;
    gamesPlayed?: {};
}
=======
    id: string;
    name: string;
    email: string;
    logo: string;
    games: Game[];
}
>>>>>>> b8262353e4d4ea59bf8f14b27d1b25b11a70f414
