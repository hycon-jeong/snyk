import {MigrationInterface, QueryRunner} from "typeorm";

export class addcolumndateinuser1652865075342 implements MigrationInterface {
    name = 'addcolumndateinuser1652865075342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_pw_modified_at\` timestamp NULL COMMENT '마지막 비밀번호 수정일'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_pw_modified_at\``);
    }

}
