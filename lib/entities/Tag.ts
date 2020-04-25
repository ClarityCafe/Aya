import {Entity, PrimaryColumn, Column, OneToMany, ManyToMany} from "typeorm";
import {Post} from "./Post";
import {Collection} from "./Collection";

@Entity()
export class Tag {
    @PrimaryColumn("uniqueidentifier")
    name: string;

    @Column()
    @ManyToMany(type => Post, post => post.tags)
    posts: Post[];

    @Column()
    @ManyToMany(type => Collection, collection => collection.tags)
    collections: Collection[];

    @Column("bool")
    public isNsfw: boolean;
}