import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('message', { schema: 'mycar' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'icon', nullable: true, length: 255 })
  icon: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'message', nullable: true, length: 500 })
  message: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'sub_message', nullable: true, length: 500 })
  subMessage: string | null;

  // @ApiProperty()
  // @Column('varchar', {
  //   name: 'event_type',
  //   nullable: true,
  //   length: 500,
  //   default: 'normal',
  // })
  // eventType: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @OneToMany(() => Event, (event) => event.message)
  events: Event[];
}
