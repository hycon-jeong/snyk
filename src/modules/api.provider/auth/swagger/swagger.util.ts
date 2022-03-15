import { ApiProperty } from '@nestjs/swagger';

export const createUserDescriptionHtml = (): string => {
  return `<div>
  <div>providerUserKey,providerId와 부합하는 userKey 제공</div>
      <h2>mandatory</h2>
        <div>1. providerUserKey</div>
        <div>2. providerId</div>
        <h3>프로퍼티의 자세한 내용은 Schema를 클릭하세요.</h3>
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
