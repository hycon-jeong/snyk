import {MigrationInterface, QueryRunner} from "typeorm";

export class addroleanmapping1650101148193 implements MigrationInterface {
    name = 'addroleanmapping1650101148193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`code\` varchar(255) NULL, \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role-authority-mapping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_id\` int NOT NULL, \`authority_id\` int NOT NULL, \`mapping_status\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD CONSTRAINT \`FK_bbd05b133e2645ad3e3ee765c28\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role-authority-mapping\` ADD CONSTRAINT \`FK_732209a26200f3b214199dce776\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role-authority-mapping\` ADD CONSTRAINT \`FK_d2f80546b7b9d89582367d4caf8\` FOREIGN KEY (\`authority_id\`) REFERENCES \`authority\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role-authority-mapping\` DROP FOREIGN KEY \`FK_d2f80546b7b9d89582367d4caf8\``);
        await queryRunner.query(`ALTER TABLE \`role-authority-mapping\` DROP FOREIGN KEY \`FK_732209a26200f3b214199dce776\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP FOREIGN KEY \`FK_bbd05b133e2645ad3e3ee765c28\``);
        await queryRunner.query(`DROP TABLE \`role-authority-mapping\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
