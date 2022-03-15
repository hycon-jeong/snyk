import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';
import { EventType } from 'modules/api.tvapp/test/tv.test.controller';
import { EventStatus } from 'modules/common/constants/eventStatus';
import * as moment from 'moment';
import { createEventHtml } from '../swagger/swagger.util';

export class CreateEventDto {
  @ApiProperty({
    type: String,
    description: 'tv 앱에서 보여질 이미지 (default 로고)',
    required: false,
    example: 'https://cdn.policetv.co.kr/news/photo/202009/11773_7845_319.jpg',
  })
  readonly imageUrl: string;

  @ApiProperty({
    type: String,
    description: 'tv 앱에서 사용자에게 보여질 제목',
    required: true,
    example: '차량 알림',
    default: '차량 알림',
    maxLength: 33,
  })
  @MaxLength(33)
  readonly title: string;

  @ApiProperty({
    type: String,
    description: 'tv 앱에서 상세보기 클릭 시 화면 전환 할 url',
    required: false,
  })
  readonly redirectUrl: string;

  @ApiProperty({
    type: String,
    description: 'tv 앱에서 사용자에게 보여질 내용',
    required: true,
    maxLength: 80,
    example: '마이카 알람서비스로부터 차량 충돌 알림이 도착하였습니다.',
  })
  @IsString()
  @MaxLength(80)
  readonly messageContent: string;

  @ApiProperty({
    type: Date,
    description: '이벤트 발생일',
    required: true,
    example: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  readonly issuedAt: Date;

  @ApiProperty({
    enum: EventType,
    required: true,
    description: `\n${createEventHtml()}`,
    default: EventType.normal,
    example: EventType.normal,
  })
  @IsEnum(EventType)
  eventType: EventType;

  readonly status: EventStatus;
}
