import {MigrationInterface, QueryRunner} from "typeorm";

export class generateTvCertCode1644825105948 implements MigrationInterface {
    name = 'generateTvCertCode1644825105948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tv_cert_code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tv_device_token\` varchar(255) NULL, \`tv_type\` varchar(255) NULL, \`tv_cert_code\` varchar(255) NULL, \`tv_verify_code\` varchar(255) NULL, \`expire_dt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tv_cert_code\``);
    }

}
