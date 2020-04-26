import {Entity, PrimaryColumn, ManyToOne, Column, ManyToMany, CreateDateColumn} from "typeorm";
import {User} from './User';
import {Tag} from './Tag';

@Entity()
export class Post {
    @PrimaryColumn("int", {unique: true})
    public id: Number;

    @ManyToOne(type => User,  user => user.posts)
    public author: Number;

    @Column("string", {length: 24})
    public caption: String;

    @Column("string")
    public cdnUrl: String;

    @Column("bool")
    public isNsfw: Boolean;

    @Column("timestamp")
    public dateCreated: String;

    @ManyToMany(type => Tag, tags => tags.posts)
    tags: Tag[];
}
