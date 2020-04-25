import {Entity, PrimaryColumn, ManyToOne, Column, ManyToMany} from "typeorm";
import {User} from './User';
import {Tag} from './Tag';

@Entity()
export class Post {
    @PrimaryColumn("uniqueidentifier")
    public id: number;

    @ManyToOne(type => User,  user => user.posts)
    public author: number;

    @Column()
    public caption: string;

    @Column()
    public cdnUrl: string;

    @Column("bool")
    public isNsfw: boolean;

    @Column("timestamp")
    public dateCreated: string;

    @ManyToMany(type => Tag, tags => tags.posts)
    tags: Tag[];
}
