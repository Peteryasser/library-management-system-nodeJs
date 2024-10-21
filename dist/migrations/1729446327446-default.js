"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1729446327446 = void 0;
class Default1729446327446 {
    constructor() {
        this.name = 'Default1729446327446';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`borrow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`borrowDate\` date NOT NULL, \`returnDate\` date NULL, \`userId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`publishedDate\` date NOT NULL, \`stock\` int NOT NULL DEFAULT '1', \`totalBorrowed\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`borrow\` ADD CONSTRAINT \`FK_395ef8d1ea4a0ff8f1fa17f67ad\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`borrow\` ADD CONSTRAINT \`FK_f5c8ea379eee06ce1482f20d101\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`borrow\` DROP FOREIGN KEY \`FK_f5c8ea379eee06ce1482f20d101\``);
        await queryRunner.query(`ALTER TABLE \`borrow\` DROP FOREIGN KEY \`FK_395ef8d1ea4a0ff8f1fa17f67ad\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP TABLE \`borrow\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
exports.Default1729446327446 = Default1729446327446;
