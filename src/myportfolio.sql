CREATE TABLE `projet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `date` VARCHAR(255) NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `skill` (
    `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE projetSkill (
     id INT NOT NULL AUTO_INCREMENT,
    skill_id INT NOT NULL,
    projet_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_projetSkill_projet FOREIGN KEY (projet_id) REFERENCES projet(id),
    CONSTRAINT fk_projetSkill_skill FOREIGN KEY (skill_id) REFERENCES skill(id)
);