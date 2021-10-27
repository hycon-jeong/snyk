import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Event } from './event.entity';

@Entity('eventitemresult', { schema: 'mycar' })
export class Eventitemresult {
  @Column('int', { primary: true, name: 'result_id' })
  resultId: number;

  @Column('varchar', { name: 'consumer_code', nullable: true, length: 45 })
  consumerCode: string | null;

  @Column('json', { name: 'reuslt', nullable: true })
  reuslt: object | null;

  @Column('int', { primary: true, name: 'event_id' })
  eventId: number;

  @ManyToOne(() => Event, (event) => event.eventitemresults, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'event_id', referencedColumnName: 'id' }])
  event: Event;
}
