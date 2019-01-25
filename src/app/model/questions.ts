export interface Questions {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct:string;
    incorrect: Array<string>;
}
