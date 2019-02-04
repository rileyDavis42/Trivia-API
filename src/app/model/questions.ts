export interface Questions {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    pAnswers: Array<object>;
    correct: boolean;
    playerId: string;
}
