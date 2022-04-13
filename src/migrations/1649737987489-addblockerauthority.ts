import { MigrationInterface, QueryRunner } from 'typeorm';

export class addblockerauthority1649737987489 implements MigrationInterface {
  name = 'addblockerauthority1649737987489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tv_device\` CHANGE \`reg_dt\` \`created_at\` datetime NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`blocker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`provider_id\` int NOT NULL, \`ip_address\` varchar(64) NULL, \`mac_address\` varchar(64) NULL, \`note\` varchar(512) NULL, \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user-authority-mapping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`provider_id\` int NOT NULL, \`user_id\` int NOT NULL, \`authority_id\` int NOT NULL, \`mapping_status\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`authority\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tv_device\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tv_device\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`blocker\` ADD CONSTRAINT \`FK_67230ccfaccf65d34ef17b71115\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-authority-mapping\` ADD CONSTRAINT \`FK_7b33eb81df5d024d2bfddd0dec2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-authority-mapping\` ADD CONSTRAINT \`FK_241de6df6a5ae7767ba276e3732\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-authority-mapping\` ADD CONSTRAINT \`FK_b9676941e49d81828e5c34af631\` FOREIGN KEY (\`authority_id\`) REFERENCES \`authority\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user-authority-mapping\` DROP FOREIGN KEY \`FK_b9676941e49d81828e5c34af631\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-authority-mapping\` DROP FOREIGN KEY \`FK_241de6df6a5ae7767ba276e3732\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-authority-mapping\` DROP FOREIGN KEY \`FK_7b33eb81df5d024d2bfddd0dec2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`blocker\` DROP FOREIGN KEY \`FK_67230ccfaccf65d34ef17b71115\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tv_device\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tv_device\` ADD \`created_at\` datetime NULL`,
    );
    await queryRunner.query(`DROP TABLE \`authority\``);
    await queryRunner.query(`DROP TABLE \`user-authority-mapping\``);
    await queryRunner.query(`DROP TABLE \`blocker\``);
    await queryRunner.query(
      `ALTER TABLE \`tv_device\` CHANGE \`created_at\` \`reg_dt\` datetime NULL`,
    );
  }
}
