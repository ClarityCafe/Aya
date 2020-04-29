import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import Collection from "./Collection";
import Post from "./Post";

@Entity()
export default class Tag {
  @PrimaryColumn("string", { unique: true })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @ManyToMany(() => Collection, (collection) => collection.tags)
  collections: Collection[];

  @Column("bool")
  isNsfw: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
