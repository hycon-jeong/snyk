import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PasswordTransformer } from './password.transformer';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  // @PrimaryGeneratedColumn("uuid")
  // id: string;

  @Column({ name: 'user_id', length: 255 })
  userId: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  firstName: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  toJSON() {
    const { password, ...self } = this;
    return self;
  }
}

export class UserFillableFields {
  userId: string;
  name: string;
  password: string;
}
