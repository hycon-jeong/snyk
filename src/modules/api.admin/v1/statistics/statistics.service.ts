import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'modules/config';
import { Consumer, Event, Message, Provider, User } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTotalProvider({ providerId }) {
    const params = {};
    if (providerId) params['id'] = providerId;
    const totalProvider = this.providerRepository.count(params);
    return totalProvider;
  }

  async getTotalEvent({ providerId }) {
    const params = {};
    if (providerId) params['providerId'] = providerId;
    const totalEvent = this.eventRepository.count(params);
    return totalEvent;
  }
  async getTotalMessage({ providerId }) {
    const totalMessage = this.messageRepository.count();
    return totalMessage;
  }

  async getTotalUser({ providerId, roleId }) {
    const params = {};
    if (providerId) params['providerId'] = providerId;
    if (roleId) params['roleId'] = roleId;
    const totalUser = await this.userRepository.count(params);

    return totalUser;
  }

  async getUserRegisteringByDate(startDate, endDate, providerId) {
    const params = [startDate, endDate];
    if (providerId) params.push(providerId);
    return this.userRepository.query(
      `SELECT count(*) as count, DATE_FORMAT(u.created_at,'%Y-%m-%d') as createdAt , u.provider_id as providerId, p.provider_name as providerName
  FROM users as u
    LEFT JOIN provider p on p.id = u.provider_id
    WHERE DATE_FORMAT(u.created_at,'%Y-%m-%d') >= ? AND DATE_FORMAT(u.created_at,'%Y-%m-%d') < ? AND u.provider_id IS NOT NULL
    ${providerId ? ' AND u.provider_id = ?' : ''}
    GROUP BY DATE_FORMAT(u.created_at,'%Y-%m-%d'),u.provider_id
    ORDER BY u.created_at DESC`,
      params,
    );
  }

  async getTotalEventByOEM(providerId) {
    const params = [];
    if (providerId) params.push(providerId);
    return this.userRepository.query(
      `SELECT count(*) as count, e.provider_id as providerId, p.provider_name as providerName
  FROM event as e
    LEFT JOIN provider p on p.id = e.provider_id
    WHERE p.status= 'ACTIVE'
    ${providerId ? ' AND e.provider_id = ?' : ''}
    GROUP BY e.provider_id`,
      params,
    );
  }

  async getUserRank(startDate, today, endDate, providerId) {
    return this.userRepository.query(
      `SELECT COUNT(*) AS curr,u.name as userName ,u.id as userId,
      IFNULL((SELECT COUNT(*) FROM event AS ie
      LEFT JOIN users AS iu ON iu.id = ie.user_id
          WHERE iu.id = u.id AND ie.issued_at > ? AND ie.issued_at <= ?
        GROUP BY ie.user_id),0) AS prev
  FROM event as e
    LEFT JOIN users AS u ON u.id = e.user_id
    WHERE e.issued_at > ? AND e.issued_at <= ?
    ${providerId ? ' AND e.provider_id = ? ' : ''}
    GROUP BY e.user_id
    ORDER BY curr desc
  LIMIT 10`,
      [startDate, today, today, endDate, providerId],
    );
  }
  async getUserTotalRank(roleId, providerId) {
    return this.userRepository.query(
      `SELECT 
        (select count(*) from event e where e.user_id = u.id) as totalCount,
        u.name as userName,
        u.id as userId
          FROM users as u
          WHERE 1=1     
            AND u.role_id = ?    
            ${providerId ? ' AND u.provider_id = ? ' : ''}
          GROUP BY u.id
          ORDER BY totalCount desc
      LIMIT 10`,
      [roleId, providerId],
    );
  }

  async getUserEventCountGroupByEventType(roleId, providerId) {
    return this.userRepository.query(
      `SELECT 
        u.id  as id,
        u.name as name,
        (select count(*) from event e where e.user_id = u.id) as totalCount,
        (select count(*) from event e where e.user_id = u.id and e.event_type = 'normal') as normalCount,
        (select count(*) from event e where e.user_id = u.id and e.event_type = 'important') as importantCount,
        (select count(*) from event e where e.user_id = u.id and e.event_type = 'advertise') as advertiseCount
      from users u
        WHERE 1=1     
        AND u.role_id = ?    
        ${providerId ? ' AND u.provider_id = ? ' : ''}
      group by u.id
      order by totalCount desc
      limit 10`,
      [roleId, providerId],
    );
  }

  async getProviderRank(startDate, today, endDate, providerId) {
    return this.userRepository.query(
      `SELECT COUNT(*) AS curr,p.provider_name as providerName, p.id as providerId,
      IFNULL((SELECT COUNT(*) FROM event AS ie
        LEFT JOIN \`provider\` AS ip on ip.id = ie.provider_id
            WHERE ip.id = e.provider_id AND ie.issued_at > ? AND ie.issued_at <= ?
          GROUP BY ip.id),0) AS prev
    FROM event as e
      LEFT JOIN \`provider\` AS p ON p.id = e.provider_id
      WHERE e.issued_at > ? AND e.issued_at <= ?
      ${providerId ? ' AND e.provider_id = ? ' : ''}
      GROUP BY p.id
      ORDER BY curr desc
    LIMIT 10`,
      [startDate, today, today, endDate, providerId],
    );
  }

  async getProviderTotalRank(providerId) {
    return this.userRepository.query(
      `SELECT 
        (select count(*) from event e where e.provider_id = p.id) as totalCount,
        p.provider_name as providerName,
        p.id as providerId
          FROM provider as p
            WHERE 1=1
              ${providerId ? ' AND p.id = ? ' : ''}
          ORDER BY totalCount desc
      LIMIT 10`,
      [providerId],
    );
  }

  async getProviderEventCountGroupByEventType(providerId) {
    return this.userRepository.query(
      `SELECT 
        p.id  as providerId,
        p.provider_name as providerName,
        (select count(*) from event e where e.provider_id = p.id) as totalCount,
        (select count(*) from event e where e.provider_id = p.id and e.event_type = 'normal') as normalCount,
        (select count(*) from event e where e.provider_id = p.id and e.event_type = 'important') as importantCount,
        (select count(*) from event e where e.provider_id = p.id and e.event_type = 'advertise') as advertiseCount
      from provider p
        WHERE 1=1     
        ${providerId ? ' AND p.id = ? ' : ''}
      order by totalCount desc
      limit 10`,
      [providerId],
    );
  }

  async getConsumerRank(startDate, today, endDate, providerId) {
    return this.userRepository.query(
      `SELECT COUNT(*) AS curr,c.consumer_name as consumerName ,c.id as consumerId,
      IFNULL((SELECT COUNT(*) FROM event AS ie
        LEFT JOIN \`user-mapping\` AS ium on ium.id = ie.user_mapping_id
        LEFT JOIN consumer AS ic ON ic.id = ium.consumer_id
            WHERE ic.id = c.id AND ie.issued_at > ? AND ie.issued_at <= ?
          GROUP BY ic.id),0) AS prev
    FROM event as e
      LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
      LEFT JOIN consumer AS c ON c.id = um.consumer_id
      WHERE e.issued_at > ? AND e.issued_at <= ?
      ${providerId ? ' AND e.provider_id = ? ' : ''}
      GROUP BY c.id
      ORDER BY curr desc
    LIMIT 10`,
      [startDate, today, today, endDate, providerId],
    );
  }

  async getConsumerTotalRank(providerId) {
    return this.userRepository.query(
      `SELECT 
        (select count(*) from event e
          LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
            where c.id = um.consumer_id
            ${providerId ? ' AND um.provider_id = ? ' : ''}
        ) as totalCount,
        c.consumer_name as consumerName ,
        c.id as consumerId
        FROM consumer as c
          WHERE 1=1
        GROUP BY c.id
        ORDER BY totalCount desc
      LIMIT 10`,
      [providerId],
    );
  }

  async getConsumerEventCountGroupByEventType(providerId) {
    return this.userRepository.query(
      `SELECT 
        c.id  as consumerId,
        c.consumer_name as consumerName,
        (
          select count(*) from event e 
            LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
              where c.id = um.consumer_id
              ${providerId ? ' AND um.provider_id = ? ' : ''}
        ) as totalCount,
        (
          select count(*) from event e 
            LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
              where c.id = um.consumer_id
              ${providerId ? ' AND um.provider_id = ? ' : ''}
              and e.event_type = 'normal'
        ) as normalCount,
        (
          select count(*) from event e 
            LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
              where c.id = um.consumer_id
              ${providerId ? ' AND um.provider_id = ? ' : ''}
              and e.event_type = 'important'
        ) as importantCount,
        (
          select count(*) from event e 
            LEFT JOIN \`user-mapping\` AS um on um.id = e.user_mapping_id
              where c.id = um.consumer_id
              ${providerId ? ' AND um.provider_id = ? ' : ''}
              and e.event_type = 'advertise'
        ) as advertiseCount
      from consumer c
        WHERE 1=1     
      order by totalCount desc
      limit 10`,
      [providerId, providerId, providerId, providerId],
    );
  }

  async getProviderApiCallsByRange({
    startDate,
    endDate,
    providerId,
  }: {
    startDate?: string;
    endDate?: string;
    providerId?: number;
  }): Promise<any> {
    const params = [startDate, endDate];
    if (providerId) params.push(providerId + '');
    return this.eventRepository.query(
      `SELECT 
        count(*) as totalCount,
        p.provider_name as providerName,
        p.id as providerId
      FROM provider as p
        LEFT JOIN event e ON e.provider_id = p.id
          WHERE 1=1
          ${startDate ? ' AND e.issued_at >= ?' : ''}
          ${endDate ? ' AND e.issued_at < ?' : ''}
        ${providerId ? 'AND p.id = ?' : ''}
        GROUP BY p.id
      LIMIT 10`,
      params,
    );
  }
}
