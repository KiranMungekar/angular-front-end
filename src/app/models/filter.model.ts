export class filterModel{
    _id:String;
    name:String;
    rating:Number=0;
    director:String;
    genre:String[]=[];

    constructor(_id,name,rating,director,genre){
        this._id= _id;
        this.director= director;
        this.rating= rating;
        this.name= name;
        this.genre= genre;
    }
}