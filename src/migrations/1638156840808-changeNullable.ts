import {MigrationInterface, QueryRunner} from "typeorm";

export class changeNullable1638156840808 implements MigrationInterface {
    name = 'changeNullable1638156840808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` CHANGE \`consumer_name\` \`consumer_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` CHANGE \`consumer_server_ip\` \`consumer_server_ip\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` CHANGE \`consumer_image_url\` \`consumer_image_url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` CHANGE \`consumer_image_url\` \`consumer_image_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` CHANGE \`consumer_server_ip\` \`consumer_server_ip\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` CHANGE \`consumer_name\` \`consumer_name\` varchar(255) NULL`);
    }

}
