export class Player {
  constructor(
    public name: string, 
    public userSymbol: string, //X or O
    public active: boolean = false,
    public winner: boolean = false,
    public points: number = 0,
  ) {}
}