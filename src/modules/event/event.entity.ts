import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event', { schema: 'mycar' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'event_type', nullable: true, length: 45 })
  eventType: string | null;

  @Column('varchar', { name: 'event_content', nullable: true, length: 1024 })
  eventContent: string | null;
}
