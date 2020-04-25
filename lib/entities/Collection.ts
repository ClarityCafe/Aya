import {Entity, PrimaryColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import {User} from "./User";
import {Post} from './Post';
import {Tag} from './Tag';

@Entity()
export class Collection {
    @PrimaryColumn("uniqueidentifier")
    public id: number;

    @Column()
    @ManyToOne(type => User, user => user.collections)
    public author: number;  

    @ManyToMany(type => Post, post => post.id)
    public posts: Post[];

    @Column("bool")
    public isNsfw: boolean;

    @ManyToMany(type => Tag, tags => tags.collections)
    @Column()
    tags: Tag[];
}
