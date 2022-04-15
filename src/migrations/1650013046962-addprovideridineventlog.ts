import {MigrationInterface, QueryRunner} from "typeorm";

export class addprovideridineventlog1650013046962 implements MigrationInterface {
    name = 'addprovideridineventlog1650013046962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`provider_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD CONSTRAINT \`FK_e694373598a00656ffd7457964f\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6425135effde2ab8322f8464932\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6425135effde2ab8322f8464932\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP FOREIGN KEY \`FK_e694373598a00656ffd7457964f\``);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`provider_id\``);
    }

}
