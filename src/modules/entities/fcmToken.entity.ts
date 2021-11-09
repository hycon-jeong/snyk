import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '.';

@Entity('fcm_tokens', { schema: 'mycar' })
export class FcmToken {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'token', unique: true, nullable: false })
  token: string;

  @ApiProperty()
  @Column('varchar', { name: 'client_id', nullable: false })
  client_id: string;

  @ManyToOne(() => User, (users) => users.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
