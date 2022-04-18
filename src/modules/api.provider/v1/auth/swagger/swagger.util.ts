import { ApiProperty, PickType } from '@nestjs/swagger';

export const checkUserDescriptionHtml = (): string => {
  return `<div>
  <div>userKey,providerId와 부합하는 userKey 제공</div>
      <h2>mandatory</h2>
        <div>1. userKey</div>
        <div>2. providerId</div>
        <h3>프로퍼티의 자세한 내용은 Schema를 클릭하세요.</h3>
    </div>
  `;
};

export const createUserDescriptionHtml = (): string => {
  return `<div>
  <div>userKey,providerId와 부합하는 userKey 제공</div>
      <h2>mandatory</h2>
        <div>1. userKey</div>
        <div>2. providerId</div>
        <h3>프로퍼티의 자세한 내용은 Schema를 클릭하세요.</h3>
    </div>
  `;
};

export const deleteUserDescriptionHtml = (): string => {
  return `<div>
  <div>userKey,providerId 모바일 앱 유저 생성(테스트)</div>
      <h2>mandatory</h2>
        <div>1. userKey</div>
        <div>2. providerId</div>
    </div>
  `;
};

export class createUserSuccessResponse {
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
      userKey: 'string',
    },
  })
  readonly data?: object;
}

export class deleteUserSuccessResponse extends PickType(
  createUserSuccessResponse,
  ['isSuccess', 'message'],
) {
  @ApiProperty({
    type: Number,
    description: 'Http Code',
    example: 200,
    required: true,
    default: 200,
  })
  readonly statusCode: number;
}
