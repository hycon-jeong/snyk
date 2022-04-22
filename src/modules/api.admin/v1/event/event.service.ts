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

  async getProviderApiCalls(params): Promise<any> {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .select(
        'count(*) as count, provider.provider_name as providerName, event.provider_id as providerId',
      )
      .leftJoin('provider', 'provider', 'provider.id = event.provider_id');

    if (params.providerId) {
      query.where('event.provider_id = :providerId', {
        providerId: params.providerId,
      });
    }
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
    providerId,
    consumerId,
  }: {
    start_date?: string;
    end_date?: string;
    providerId?: number;
    consumerId?: number;
  }): Promise<any> {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .select(
        'count(*) as count, provider.provider_name as providerName, event.provider_id as providerId, date_format(event.issued_at,"%Y-%m") as issuedAt',
      )
      .leftJoin('provider', 'provider', 'provider.id = event.provider_id');
    if (start_date) {
      query.andWhere('event.issued_at >= :start_date', { start_date });
    }
    if (end_date) {
      query.andWhere('event.issued_at < :end_date', { end_date });
    }
    if (providerId) {
      query.andWhere('event.provider_id = :providerId', { providerId });
    }
    // if (csm) {
    //   query.andWhere('');
    // }
    return query
      .groupBy('date_format(event.issued_at,"%Y-%m")')
      .addGroupBy('event.provider_id')
      .getRawMany();
  }

  async getConsumerApiCalls(params): Promise<any> {
    const query = this.eventRepository
      .createQueryBuilder('event')
      .select(
        'count(*) as count, consumer.consumer_name as consumerName, userMapping.consumer_id as consumerId',
      )
      .leftJoin(
        'user-mapping',
        'userMapping',
        'userMapping.id = user_mapping_id',
      )
      .leftJoin(
        'consumer',
        'consumer',
        'consumer.id = userMapping.consumer_id',
      );

    if (params.providerId) {
      query.where('event.provider_id = :providerId', {
        providerId: params.providerId,
      });
    }

    return query.groupBy('userMapping.consumer_id').getRawMany();
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
