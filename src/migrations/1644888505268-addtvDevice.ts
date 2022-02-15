import {MigrationInterface, QueryRunner} from "typeorm";

export class addtvDevice1644888505268 implements MigrationInterface {
    name = 'addtvDevice1644888505268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tv_device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tv_device_token\` varchar(255) NULL, \`tv_type\` varchar(255) NULL, \`status\` varchar(255) NULL, \`expire_dt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` DROP COLUMN \`tv_device_token\``);
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` DROP COLUMN \`tv_type\``);
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` ADD \`tv_device_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` DROP COLUMN \`tv_device_id\``);
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` ADD \`tv_type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tv_cert_code\` ADD \`tv_device_token\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`tv_device\``);
    }

}
