import {MigrationInterface, QueryRunner} from "typeorm";

export class consumerServerIpVarchar1638323502795 implements MigrationInterface {
    name = 'consumerServerIpVarchar1638323502795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`consumer_server_ip\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`consumer_server_ip\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`consumer_server_ip\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`consumer_server_ip\` int NULL`);
    }

}
