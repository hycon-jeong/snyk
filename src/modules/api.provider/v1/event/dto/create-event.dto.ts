import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { EventType } from 'modules/api.tvapp/v1/test/tv.test.controller';
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
  @IsOptional()
  readonly imageUrl: string;

  @ApiProperty({
    type: String,
    description: 'tv 앱에서 사용자에게 보여질 제목',
    required: true,
    example: '차량 알림',
    default: '차량 알림',
    maxLength: 36,
  })
  @MaxLength(36)
  readonly messageTitle: string;

  @ApiProperty({
    type: String,
    description: 'tv 앱에서 상세보기 클릭 시 화면 전환 할 URL',
    required: false,
    maxLength: 512,
  })
  @MaxLength(512)
  @IsOptional()
  readonly redirectUrl: string;

  @ApiProperty({
    type: String,
    description: '사용자의 이벤트 처리 결과를 받을 수 있는 URL',
    required: false,
    maxLength: 512,
  })
  @MaxLength(512)
  @IsOptional()
  readonly callbackUrl: string;

  @ApiProperty({
    type: String,
    description: 'ISO Language Code ( "ko", "en-US" )',
    required: false,
    maxLength: 12,
    default: 'ko',
    example: 'ko',
  })
  @MaxLength(12)
  @IsOptional()
  readonly languageCode: string;

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
    default: EventType.INFO,
    example: EventType.INFO,
  })
  @IsEnum(EventType)
  eventType: EventType;

  @ApiProperty({
    type: String,
    description: 'Tv앱에서 지원 안하는 언어셋일 경우 보여질 제목',
    required: false,
    maxLength: 80,
    example: '차량 알림',
    name: 'optMsgTitle',
  })
  @MaxLength(80)
  @IsOptional()
  optMsgTitle: string;

  @ApiProperty({
    type: String,
    description: 'Tv앱에서 지원 안하는 언어셋일 경우 보여질 내용',
    required: false,
    maxLength: 80,
    example: '마이카 알람서비스로부터 차량 충돌 알림이 도착하였습니다.',
    name: 'optMsgContent',
  })
  @IsString()
  @MaxLength(80)
  @IsOptional()
  optMsgContent: string;

  readonly status: EventStatus;
}
