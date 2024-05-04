/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.sql(`
        INSERT INTO consonant 
            ( character, sample_word, initial_pariboon, 
        sample_pariboon, sample_translation, sample_sound, 
        class, final_pariboon, obsolete ) 
        VALUES 
            ( 'ก', 'ไก่', 'g', 'gài', 'chicken', '', 'mid', 'k', FALSE),
            ( 'ข', 'ไข่', 'k ', 'kài', 'egg', '', 'high', 'k', FALSE),
            ( 'ฃ', 'ขวด', 'k', 'kùat', 'bottle', '', 'high', 'k', TRUE),
            ( 'ค', 'ควาย', 'k', 'kwaai', 'water buffalo', '', 'low-paired', 'k', FALSE),
            ( 'ฅ', 'คน', 'k', 'kon', 'person', '', 'low-paired', 'k', TRUE),
            ( 'ฆ', 'ระฆัง', 'k', 'rá kang', 'bell', '', 'low-paired', 'k', FALSE),
            ( 'ง', 'งู', 'ng', 'nguu', 'snake', '', 'low-unpaired', 'ng', FALSE),
            ( 'จ', 'จาน', 'j', 'jaan', 'plate', '', 'mid', 't', FALSE),
            ( 'ฉ', 'ฉิ่ง', 'ch', 'chìng', 'small cymbal', '', 'high', '-', FALSE),
            ( 'ช', 'ช้าง', 'ch', 'cháang', 'elephant', '', 'low-paired', 't', FALSE),
            ( 'ซ', 'โซ่', 's', 'sôo', 'chain', '', 'low-paired', 's', FALSE),
            ( 'ฌ', 'เฌอ', 'ch', 'chəə', 'tree', '', 'low-paired', 't', FALSE),
            ( 'ญ', 'หญิง', 'y', 'yǐng', 'woman', '', 'low-unpaired', 'n', FALSE),
            ( 'ฎ', 'ชฎา', 'd', 'chá daa', 'headdress', '', 'mid', 't', FALSE),
            ( 'ฏ', 'ปฏัก', 'dt', 'bpà dtàk', 'spear', '', 'mid', 't', FALSE),
            ( 'ฐ', 'ฐาน', 't', 'tǎan', 'pedestal', '', 'high', 't', FALSE),
            ( 'ฑ', 'มณโฑ', 't', 'mon too', 'Montoe the Queen', '', 'low-paired', 't', FALSE),
            ( 'ฒ', 'ผู้เฒ่า', 't', 'pûu tâo', 'old man', '', 'low-paired', 't', FALSE),
            ( 'ณ', 'เณร', 'n', 'neen', 'young monk', '', 'low-unpaired', 'n', FALSE),
            ( 'ด', 'เด็ก', 'd', 'dèk', 'child', '', 'mid', 't', FALSE),
            ( 'ต', 'เต่า', 'dt', 'dtào', 'turtle', '', 'mid', 't', FALSE),
            ( 'ถ', 'ถุง', 't', 'tǔng', 'bag', '', 'high', 't', FALSE),
            ( 'ท', 'ทหาร', 't', 'tá hǎan', 'soldier', '', 'low-paired', 't', FALSE),
            ( 'ธ', 'ธง', 't', 'tong', 'flag', '', 'low-paired', 't', FALSE),
            ( 'น', 'หนู', 'n', 'nǔu', 'mouse', '', 'low-unpaired', 'n', FALSE),
            ( 'บ', 'ใบไม้', 'b', 'bai mái', 'leaf', '', 'mid', 'p', FALSE),
            ( 'ป', 'ปลา', 'bp', 'bplaa', 'fish', '', 'mid', 'p', FALSE),
            ( 'ผ', 'ผึ้ง', 'p', 'pʉ̂ng', 'bee', '', 'high', '-', FALSE),
            ( 'ฝ', 'ฝา', 'f', 'fǎa', 'lid', '', 'high', '-', FALSE),
            ( 'พ', 'พาน', 'p', 'paan', 'offering tray', '', 'low-paired', 'p', FALSE),
            ( 'ฟ', 'ฟัน', 'f', 'fan', 'tooth', '', 'low-paired', 'p', FALSE),
            ( 'ภ', 'สำเภา', 'p', 'sǎm pao', 'junk (ship)', '', 'low-paired', 'p', FALSE),
            ( 'ม', 'ม้า', 'm', 'máa', 'horse', '', 'low-unpaired', 'm', FALSE),
            ( 'ย', 'ยักษ์', 'y', 'yák', 'giant', '', 'low-unpaired', 'vowel', FALSE),
            ( 'ร', 'เรือ', 'r', 'rʉa', 'boat', '', 'low-unpaired', 'n', FALSE),
            ( 'ล', 'ลิง', 'l', 'ling', 'monkey', '', 'low-unpaired', 'n', FALSE),
            ( 'ว', 'แหวน', 'w', 'wɛ̌ɛn', 'ring', '', 'low-unpaired', 'vowel', FALSE),
            ( 'ศ', 'ศาลา', 's', 'sǎa laa', 'pavilion', '', 'high', 't', FALSE),
            ( 'ษ', 'ฤๅษี', 's', 'rʉʉ sǐi', 'hermit', '', 'high', 't', FALSE),
            ( 'ส', 'เสือ', 's', 'sʉ̌a', 'tiger', '', 'high', 't', FALSE),
            ( 'ห', 'หีบ', 'h', 'hìip', 'box', '', 'high', '-', FALSE),
            ( 'ฬ', 'จุฬา', 'l', 'jù laa', 'kite', '', 'low-unpaired', 'n', FALSE),
            ( 'อ', 'อ่าง', '-', 'àang', 'basin', '', 'mid', 'vowel', FALSE),
            ( 'ฮ', 'นกฮูก', 'h', 'nók hûuk', 'owl', '', 'low-paired', '-', FALSE)
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
        DELETE FROM consonant;
    `);
};
