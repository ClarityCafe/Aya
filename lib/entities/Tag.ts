import {Entity, PrimaryColumn, Column, ManyToMany} from "typeorm";
import {Post} from "./Post";
import {Collection} from "./Collection";

@Entity()
export class Tag {
    @PrimaryColumn("string", {unique: true})
    name: string;

    @Column("array", {unique: true})
    @ManyToMany(type => Post, post => post.tags)
    posts: Post[];

    @Column("array")
    @ManyToMany(type => Collection, collection => collection.tags)
    collections: Collection[];

    @Column("bool")
    public isNsfw: boolean;
}