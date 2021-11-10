import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity('message', { schema: 'mycar' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'icon', nullable: true, length: 255 })
  icon: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'message', nullable: true })
  message: string | null;

  @ApiProperty()
  @Column('datetime', { name: 'transmission_at', nullable: true })
  transmissionAt: Date | null;

  @ApiProperty()
  @Column('datetime', { name: 'reception_at', nullable: true })
  receptionAt: Date | null;

  @ApiProperty()
  @Column('tinyint', { name: 'transmission_flag', nullable: true, width: 1 })
  transmissionFlag: boolean | null;

  @OneToMany(() => Event, (event) => event.message)
  events: Event[];
}
