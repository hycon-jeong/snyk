import { MigrationInterface, QueryRunner } from 'typeorm';

export class changetimestamp1651039089578 implements MigrationInterface {
  name = 'changetimestamp1651039089578';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY \`issued_at\` timestamp NULL COMMENT '이벤트 발행일(프로바이더에서 받은 이벤트 발행일)'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY \`received_at\` timestamp NULL COMMENT 'tv앱에서 이벤트 수신일'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY \`completed_at\` timestamp NULL COMMENT 'tv앱에서 이벤트 확인일'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY \`failed_at\` timestamp NULL COMMENT '이벤트 오류일'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY \`failed_at\` datetime NULL COMMENT '이벤트 오류일'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY \`completed_at\` datetime NULL COMMENT 'tv앱에서 이벤트 확인일'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY \`received_at\` datetime NULL COMMENT 'tv앱에서 이벤트 수신일'`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event\` MODIFY \`issued_at\` datetime NULL COMMENT '이벤트 발행일(프로바이더에서 받은 이벤트 발행일)'`,
    );
  }
}
