import { ApiProperty } from '@nestjs/swagger';

export const createEventHtml = (): string => {
  return `이벤트 타입
    <div>1. INFO</div>
    <div>- name : 일반 알림</div>
    <div>- ui : 토스트</div>
    <img src="https://i.ibb.co/yRHpGkh/2022-03-14-4-50-56.png" />
    <div>2. IMPORTANT</div>
    <div>- name : 중요 알림</div>
    <div>- ui : 팝업</div>
    <div>1. redirectUrl 프로퍼티 유</div>
    <img src="https://i.ibb.co/zsyvpc6/2022-03-14-4-42-26.png" />
    <div>2. redirectUrl 프로퍼티 무</div>
    <div><img src="https://i.ibb.co/8KGp2nN/2022-03-14-4-43-58.png" /></div>
    <div>3. ADVERTISE</div>
    <div>- name : 광고 알림</div>
    <div>- ui : 팝업\n</div>
    <img src="https://i.ibb.co/4Mv2Wgq/2022-03-14-4-45-42.png" />`;
};

export const createEventDescriptionHtml = (): string => {
  return `<div>
      <h2>mandatory</h2>
        <div>1. messageTitle</div>
        <div>2. messageContent</div>
        <div>3. issuedAt</div>
        <div>4. eventType</div>
      <h2>optional</h2>
        <div>1. imageUrl </div>
        <div>  - default : logo</div>
        <div>2. redirectUrl</div>
        <div>3. callbackUrl</div>
        <div>4. msgLanguage</div>
        <div>5. optMsgTitle</div>
        <div>6. optMsgContent</div>
        <div></div>
        
        <h3>프로퍼티의 자세한 내용은 Schema를 클릭하세요.</h3>
    </div>
  `;
};

export class createEventSuccessResponse {
  @ApiProperty({
    type: Number,
    description: 'Http Code',
    example: 201,
    required: true,
    default: 201,
  })
  readonly statusCode: number;

  @ApiProperty({
    type: String,
    description: 'API 성공 여부',
    required: true,
    example: true,
    default: true,
  })
  readonly isSuccess: boolean;

  @ApiProperty({
    type: String,
    description: 'API 응답 메세지',
    required: true,
    example: '{메세지 내용}',
  })
  readonly message: string;

  @ApiProperty({
    type: Object,
    description: '응답 객체',
    required: true,
    example: {
      messageContent: 'string',
      subMessageContent: 'string',
      issuedAt: 'date',
      imageUrl: 'string',
      status: 'string',
    },
  })
  readonly data?: object;
}
