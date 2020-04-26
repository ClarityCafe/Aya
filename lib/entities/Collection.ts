import {Entity, PrimaryColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import {User} from "./User";
import {Post} from './Post';
import {Tag} from './Tag';

@Entity()
export class Collection {
    @PrimaryColumn("int", {unique: true})
    public id: Number;

    @Column("int")
    @ManyToOne(type => User, user => user.collections)
    public author: Number;  

    @Column("string", {length: 24})
    public name: string;

    @Column("array")
    @ManyToMany(type => Post, post => post.id)
    public posts: Post[];

    @Column("bool")
    public isNsfw: boolean;

    @ManyToMany(type => Tag, tags => tags.collections)
    @Column("array")
    tags: Tag[];
}
