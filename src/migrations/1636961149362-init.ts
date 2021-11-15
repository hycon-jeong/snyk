import {MigrationInterface, QueryRunner} from "typeorm";

export class init1636961149362 implements MigrationInterface {
    name = 'init1636961149362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`consumer_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`consumer_code\` varchar(255) NOT NULL, \`status\` varchar(255) NULL, \`date_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`consumer_domain\` varchar(255) NULL, \`consumer_mac_address\` varchar(255) NULL, \`consumer_server_type\` varchar(255) NULL, \`consumer_id\` int NULL COMMENT 'Db generic id', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_type\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'Db generic id', \`event_type\` varchar(255) NULL, \`event_content\` varchar(1024) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`icon\` varchar(255) NULL, \`message\` varchar(255) NULL, \`transmission_at\` datetime NULL, \`reception_at\` datetime NULL, \`transmission_flag\` tinyint(1) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`event_type\` varchar(255) NULL, \`status\` varchar(45) NULL, \`date_at\` datetime NULL, \`user_id\` varchar(255) NULL, \`category\` varchar(255) NULL, \`consumer_code\` varchar(255) NULL, \`provider_key\` varchar(255) NULL, \`message\` json NULL, \`transmission_at\` datetime NULL, \`reception_at\` datetime NULL, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`eventitemresult\` (\`id\` int NOT NULL AUTO_INCREMENT, \`consumer_code\` varchar(45) NULL, \`reuslt\` json NULL, \`event_id\` int NOT NULL, PRIMARY KEY (\`id\`, \`event_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NULL, \`date_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', \`status\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_96aac72f1574b88752e9fb0008\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`provider_key\` varchar(255) NULL, \`provider_code\` varchar(255) NULL, \`image_url\` varchar(255) NULL, \`issued_at\` datetime NULL, \`status\` enum ('SENDING', 'COMPLETE') NOT NULL DEFAULT 'SENDING', \`category_id\` int NOT NULL, \`provider_id\` int NOT NULL, \`event_type_id\` int NOT NULL, \`message_id\` int NOT NULL, \`user_mapping_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date_at\` datetime NULL, \`status\` varchar(255) NULL, \`provider_domain\` varchar(255) NULL, \`provider_mac_address\` varchar(255) NULL, \`provider_server_type\` varchar(255) NULL, \`provider_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider\` (\`id\` int NOT NULL AUTO_INCREMENT, \`provider_code\` varchar(255) NOT NULL, \`provider_name\` varchar(255) NULL, \`provider_server_ip\` varchar(255) NULL, \`provider_server_port\` varchar(255) NULL, \`provider_mac_address\` varchar(255) NULL, \`api_entry\` varchar(255) NULL, \`auth\` varchar(255) NULL, \`provider_os\` varchar(255) NULL, \`provider_domain\` varchar(255) NULL, \`provider_server_type\` varchar(255) NULL COMMENT '온프레미스 
클라우드
 AWS
 AZURE
  etc', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user-mapping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`mapping_status\` varchar(255) NULL, \`mapping_createAt\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`mapping_updateat\` datetime NULL, \`user_id\` int NULL, \`consumer_id\` int NULL COMMENT 'Db generic id', \`provider_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`consumer\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'Db generic id', \`consumer_code\` varchar(255) NOT NULL, \`consumer_type\` varchar(255) NULL, \`consumer_name\` varchar(255) NULL, \`consumer_server_ip\` int NOT NULL, \`consumer_server_port\` varchar(255) NULL, \`consumer_mac_address\` varchar(255) NULL, \`api_entry\` varchar(255) NULL, \`auth\` varchar(255) NULL, \`consumer_os\` varchar(255) NULL, \`consumer_domain\` varchar(255) NULL, \`consumer_server_type\` varchar(255) NULL COMMENT '온프레미스 
클라우드
 AWS
 AZURE 
  etc', UNIQUE INDEX \`IDX_6ce5ce693ff92533e7423f3856\` (\`consumer_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`consumer_event_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`consumer_code\` varchar(45) NOT NULL, \`evnet_type_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`provider_event_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`provider_code\` int NOT NULL, \`evnet_type_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_mapping_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_mapping_id\` int NOT NULL, \`provider_name\` varchar(255) NULL, \`consumer_name\` varchar(255) NULL, \`status\` varchar(255) NULL, \`date_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`, \`user_mapping_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fcm_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`client_id\` varchar(255) NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_639c0f1d38d97d778122d4f299\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`name\` varchar(255) NULL, \`desc\` varchar(255) NULL, \`image_url\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` ADD CONSTRAINT \`FK_dc2acd6d548d9283f4c7a86a257\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD CONSTRAINT \`FK_5e2189467cdc0b63a5a2b200c1c\` FOREIGN KEY (\`event_id\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`eventitemresult\` ADD CONSTRAINT \`FK_118f1ebd83f89750d86c69e2008\` FOREIGN KEY (\`event_id\`) REFERENCES \`event\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD CONSTRAINT \`FK_86d86e827a8e203ef7d390e081e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e6358bd3df1b2874637dca92bcf\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_5909c68aaa21522907e8b9780d6\` FOREIGN KEY (\`user_mapping_id\`) REFERENCES \`user-mapping\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_440d4288846d5c59e9de481b03c\` FOREIGN KEY (\`message_id\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_b966ddf4f5772104155218035a6\` FOREIGN KEY (\`event_type_id\`) REFERENCES \`event_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_8daf2126b94b7321a7845403899\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_697909a55bde1b28a90560f3ae2\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` ADD CONSTRAINT \`FK_aa765a73865fb305a2486516afb\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_5a18d61f2a9375874ddebfea25a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_3f71299c42039791a348dd32514\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` ADD CONSTRAINT \`FK_6cd2207807826603f12fede45de\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fcm_tokens\` ADD CONSTRAINT \`FK_9fd867cabc75028a5625ce7b24c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2296b7fe012d95646fa41921c8b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2296b7fe012d95646fa41921c8b\``);
        await queryRunner.query(`ALTER TABLE \`fcm_tokens\` DROP FOREIGN KEY \`FK_9fd867cabc75028a5625ce7b24c\``);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_6cd2207807826603f12fede45de\``);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_3f71299c42039791a348dd32514\``);
        await queryRunner.query(`ALTER TABLE \`user-mapping\` DROP FOREIGN KEY \`FK_5a18d61f2a9375874ddebfea25a\``);
        await queryRunner.query(`ALTER TABLE \`provider_log\` DROP FOREIGN KEY \`FK_aa765a73865fb305a2486516afb\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_697909a55bde1b28a90560f3ae2\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_8daf2126b94b7321a7845403899\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_b966ddf4f5772104155218035a6\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_440d4288846d5c59e9de481b03c\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_5909c68aaa21522907e8b9780d6\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e6358bd3df1b2874637dca92bcf\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP FOREIGN KEY \`FK_86d86e827a8e203ef7d390e081e\``);
        await queryRunner.query(`ALTER TABLE \`eventitemresult\` DROP FOREIGN KEY \`FK_118f1ebd83f89750d86c69e2008\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP FOREIGN KEY \`FK_5e2189467cdc0b63a5a2b200c1c\``);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` DROP FOREIGN KEY \`FK_dc2acd6d548d9283f4c7a86a257\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_639c0f1d38d97d778122d4f299\` ON \`fcm_tokens\``);
        await queryRunner.query(`DROP TABLE \`fcm_tokens\``);
        await queryRunner.query(`DROP TABLE \`user_mapping_log\``);
        await queryRunner.query(`DROP TABLE \`provider_event_type\``);
        await queryRunner.query(`DROP TABLE \`consumer_event_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_6ce5ce693ff92533e7423f3856\` ON \`consumer\``);
        await queryRunner.query(`DROP TABLE \`consumer\``);
        await queryRunner.query(`DROP TABLE \`user-mapping\``);
        await queryRunner.query(`DROP TABLE \`provider\``);
        await queryRunner.query(`DROP TABLE \`provider_log\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP INDEX \`IDX_96aac72f1574b88752e9fb0008\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`user_log\``);
        await queryRunner.query(`DROP TABLE \`eventitemresult\``);
        await queryRunner.query(`DROP TABLE \`event_log\``);
        await queryRunner.query(`DROP TABLE \`message\``);
        await queryRunner.query(`DROP TABLE \`event_type\``);
        await queryRunner.query(`DROP TABLE \`consumer_log\``);
    }

}
