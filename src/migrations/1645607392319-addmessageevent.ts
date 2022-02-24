import {MigrationInterface, QueryRunner} from "typeorm";

export class addmessageevent1645607392319 implements MigrationInterface {
    name = 'addmessageevent1645607392319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`message_content\` varchar(500) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`message_content\``);
    }

}
