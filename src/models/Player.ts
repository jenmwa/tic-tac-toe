export class Player {
  constructor(
    public name: string, 
    public userSymbol: string, //X or O
    public active: boolean,
    public winner: boolean,
    public points: number,
    ) {}
}