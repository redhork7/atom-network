import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1722507285173 implements MigrationInterface {
    name = 'Migrate1722507285173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`family\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(40) NULL COMMENT '가족명', \`user_uid\` int NULL, \`home_uid\` int NULL, UNIQUE INDEX \`family_home_user_unique\` (\`user_uid\`, \`home_uid\`), PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`home\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`place_name\` varchar(40) NULL COMMENT '장소명', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`hidden_at\` timestamp(6) NULL, PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`food\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(300) NOT NULL COMMENT '식재료명', \`tags\` text NOT NULL COMMENT '태그목록', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`user_uid\` int NULL, \`home_uid\` int NULL, PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(68) NOT NULL COMMENT '클라이언트 내 저장된 사용자 식별값', \`account_uid\` int NULL COMMENT '통합회원 고유번호', \`nick_name\` varchar(60) NULL COMMENT '닉네임', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a95e949168be7b7ece1a2382fe\` (\`uuid\`), PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`family\` ADD CONSTRAINT \`FK_68b5f3be4667f3252ee750e4b6e\` FOREIGN KEY (\`user_uid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`family\` ADD CONSTRAINT \`FK_c4716d7c205b857c288dc806fb9\` FOREIGN KEY (\`home_uid\`) REFERENCES \`home\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`food\` ADD CONSTRAINT \`FK_19ec1f5b2904e03bf665ed68339\` FOREIGN KEY (\`user_uid\`) REFERENCES \`user\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`food\` ADD CONSTRAINT \`FK_aeed27f69516b0e07bf5aed6949\` FOREIGN KEY (\`home_uid\`) REFERENCES \`home\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food\` DROP FOREIGN KEY \`FK_aeed27f69516b0e07bf5aed6949\``);
        await queryRunner.query(`ALTER TABLE \`food\` DROP FOREIGN KEY \`FK_19ec1f5b2904e03bf665ed68339\``);
        await queryRunner.query(`ALTER TABLE \`family\` DROP FOREIGN KEY \`FK_c4716d7c205b857c288dc806fb9\``);
        await queryRunner.query(`ALTER TABLE \`family\` DROP FOREIGN KEY \`FK_68b5f3be4667f3252ee750e4b6e\``);
        await queryRunner.query(`DROP INDEX \`IDX_a95e949168be7b7ece1a2382fe\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`food\``);
        await queryRunner.query(`DROP TABLE \`home\``);
        await queryRunner.query(`DROP INDEX \`family_home_user_unique\` ON \`family\``);
        await queryRunner.query(`DROP TABLE \`family\``);
    }

}
