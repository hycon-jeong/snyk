import {MigrationInterface, QueryRunner} from "typeorm";

export class addidsplay1652435815375 implements MigrationInterface {
    name = 'addidsplay1652435815375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`status\` \`status\` enum ('SENDING', 'COMPLETE', 'RECEIVE', 'FAIL', 'DISPLAY') NOT NULL DEFAULT 'SENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`status\` \`status\` enum ('SENDING', 'COMPLETE', 'RECEIVE', 'FAIL') NOT NULL DEFAULT 'SENDING'`);
    }

}
