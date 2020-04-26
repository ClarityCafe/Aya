import {Entity, PrimaryColumn, ManyToOne, Column, ManyToMany, CreateDateColumn} from "typeorm";
import {User} from './User';
import {Tag} from './Tag';

@Entity()
export class Post {
    @PrimaryColumn("int", {unique: true})
    public id: number;

    @ManyToOne(type => User,  user => user.posts)
    public author: number;

    @Column("string", {length: 24})
    public caption: string;

    @Column("string")
    public cdnUrl: string;

    @Column("bool")
    public isNsfw: boolean;

    @Column("timestamp")
    @CreateDateColumn()
    public dateCreated: string;

    @ManyToMany(type => Tag, tags => tags.posts)
    tags: Tag[];
}
