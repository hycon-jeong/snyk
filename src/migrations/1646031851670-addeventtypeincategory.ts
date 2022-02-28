import {MigrationInterface, QueryRunner} from "typeorm";

export class addeventtypeincategory1646031851670 implements MigrationInterface {
    name = 'addeventtypeincategory1646031851670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`event_type\` varchar(255) NULL DEFAULT 'normal'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`event_type\``);
    }

}
