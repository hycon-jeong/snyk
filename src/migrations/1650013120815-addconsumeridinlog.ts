import {MigrationInterface, QueryRunner} from "typeorm";

export class addconsumeridinlog1650013120815 implements MigrationInterface {
    name = 'addconsumeridinlog1650013120815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`consumer_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD CONSTRAINT \`FK_0b13d4e8e011a782d36e9570c8d\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP FOREIGN KEY \`FK_0b13d4e8e011a782d36e9570c8d\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`consumer_id\``);
    }

}
