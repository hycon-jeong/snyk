import {MigrationInterface, QueryRunner} from "typeorm";

export class addkeystore1650424283040 implements MigrationInterface {
    name = 'addkeystore1650424283040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`key_stores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`primary_key\` varchar(255) NOT NULL, \`secondary_key\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`key_stores\` ADD CONSTRAINT \`FK_1ce431ce46459e0b56b701919d1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`key_stores\` DROP FOREIGN KEY \`FK_1ce431ce46459e0b56b701919d1\``);
        await queryRunner.query(`DROP TABLE \`key_stores\``);
    }

}
