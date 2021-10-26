import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event', { schema: 'mycar' })
export class EventEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'event_type', nullable: true, length: 45 })
  eventType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'event_content', nullable: true, length: 1024 })
  eventContent: string | null;
}
