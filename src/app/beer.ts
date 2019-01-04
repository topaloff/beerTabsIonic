export class Beer {
  constructor(
    public name: string,
    public price: number,
    public degree: number,
    public image: string,
    public birth: Date,
    )
    {
        this.name = name;
        this.price = price;
        this.degree = degree;
        this.image = image;
        this.birth = birth;
    };
}
