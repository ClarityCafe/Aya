import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import {Post} from "./Post";
import {Collection} from "./Collection";

@Entity()
export class User {
    @PrimaryColumn("uniqueidentifier")
    public id: number;

    @Column()
    public username: string;

    @Column()
    public redditLink: string;

    @Column()
    @OneToMany(type => Post, post => post.id )
    public posts: Array<Post>;

    @Column()
    @OneToMany(type => Collection, collection => collection.id)
    public collections: Array<Collection>;

    @Column("timestamp")
    public dateCreated: string;
}
