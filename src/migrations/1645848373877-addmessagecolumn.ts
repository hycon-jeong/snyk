import {MigrationInterface, QueryRunner} from "typeorm";

export class addmessagecolumn1645848373877 implements MigrationInterface {
    name = 'addmessagecolumn1645848373877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`sub_message\` varchar(500) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`sub_message\``);
    }

}
