import {MigrationInterface, QueryRunner} from "typeorm";

export class changecolumndateinuser1652865526077 implements MigrationInterface {
    name = 'changecolumndateinuser1652865526077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_pw_modified_at\` \`last_pw_modified_at\` timestamp NOT NULL COMMENT '마지막 비밀번호 수정일' DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_pw_modified_at\` \`last_pw_modified_at\` timestamp NULL COMMENT '마지막 비밀번호 수정일'`);
    }

}
