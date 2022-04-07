import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsEventService extends TypeOrmCrudService<Event> {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {
    super(eventRepository);
  }

  async insertOne(payload): Promise<any> {
    return this.eventRepository.save(payload);
  }

  async getProviderApiCalls(): Promise<any> {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .select(
        'count(*) as provider_count, provider.provider_name, event.provider_id as provider_id',
      )
      .leftJoin('provider', 'provider', 'provider.id = event.provider_id');
    return query.groupBy('event.provider_id').getRawMany();
  }
  async getEventByProvider(provider_id) {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .select('count(*) as event_count,category.name')
      .leftJoin('categories', 'category', 'category.id = event.category_id')
      .where('event.provider_id = :provider_id', {
        provider_id: provider_id,
      });

    return query.groupBy('event.category_id').getRawMany();
  }

  async getProviderApiCallsByMonthly({
    start_date,
    end_date,
    oem,
    csm,
  }: {
    start_date?: string;
    end_date?: string;
    oem?: number;
    csm?: number;
  }): Promise<any> {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .select(
        'count(*) as provider_count, provider.provider_name, event.provider_id as provider_id, date_format(event.issued_at,"%Y-%m") as issued_at',
      )
      .leftJoin('provider', 'provider', 'provider.id = event.provider_id');
    if (start_date) {
      query.andWhere('event.issued_at >= :start_date', { start_date });
    }
    if (end_date) {
      query.andWhere('event.issued_at < :end_date', { end_date });
    }
    if (oem) {
      query.andWhere('event.provider_id = :oem', { oem });
    }
    // if (csm) {
    //   query.andWhere('');
    // }
    return query
      .groupBy('date_format(event.issued_at,"%Y-%m")')
      .addGroupBy('event.provider_id')
      .getRawMany();
  }

  async getConsumerApiCalls(): Promise<any> {
    return this.eventRepository
      .createQueryBuilder()
      .select(
        'count(*) as consumer_count, consumer.consumer_name, userMapping.consumer_id as consumer_id',
      )
      .leftJoin(
        'user-mapping',
        'userMapping',
        'userMapping.id = user_mapping_id',
      )
      .leftJoin('consumer', 'consumer', 'consumer.id = userMapping.consumer_id')
      .groupBy('userMapping.consumer_id')
      .getRawMany();
  }

  async getEventByConsumer(consumer_id) {
    return this.eventRepository
      .createQueryBuilder()
      .select('count(*) as event_count,category.name')
      .leftJoin('categories', 'category', 'category.id = category_id')
      .leftJoin(
        'user-mapping',
        'userMapping',
        'userMapping.id = user_mapping_id',
      )
      .where('userMapping.consumer_id = :consumer_id', {
        consumer_id: consumer_id,
      })
      .groupBy('category_id')
      .getRawMany();
  }
}
