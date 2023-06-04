export class Player {
  constructor(
    public name: string, 
    public userSymbol: string,
    public active: boolean = false,
    public points: number = 0,
  ) {}
}