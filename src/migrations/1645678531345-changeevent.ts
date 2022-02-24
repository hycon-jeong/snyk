import {MigrationInterface, QueryRunner} from "typeorm";

export class changeevent1645678531345 implements MigrationInterface {
    name = 'changeevent1645678531345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`sub_message_content\` varchar(500) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`sub_message_content\``);
    }

}
