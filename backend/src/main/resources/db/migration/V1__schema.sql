-- V1: Criação do schema inicial do banco de dados Logitrack

CREATE TABLE IF NOT EXISTS veiculos (
    id         BIGINT NOT NULL AUTO_INCREMENT,
    placa      VARCHAR(10)  UNIQUE NOT NULL,
    modelo     VARCHAR(50)  NOT NULL,
    tipo       VARCHAR(20)  NOT NULL,
    ano        INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS viagens (
    id             BIGINT NOT NULL AUTO_INCREMENT,
    veiculo_id     BIGINT NOT NULL,
    data_saida     DATETIME NOT NULL,
    data_chegada   DATETIME,
    origem         VARCHAR(100),
    destino        VARCHAR(100),
    km_percorrida  DECIMAL(10,2),
    PRIMARY KEY (id),
    CONSTRAINT fk_viagens_veiculo
        FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS manutencoes (
    id                BIGINT NOT NULL AUTO_INCREMENT,
    veiculo_id        BIGINT NOT NULL,
    data_inicio       DATE NOT NULL,
    data_finalizacao  DATE,
    tipo_servico      VARCHAR(100),
    custo_estimado    DECIMAL(10,2),
    status            VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
    PRIMARY KEY (id),
    CONSTRAINT fk_manutencoes_veiculo
        FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS usuarios (
    id     BIGINT NOT NULL AUTO_INCREMENT,
    nome   VARCHAR(100) NOT NULL,
    email  VARCHAR(150) UNIQUE NOT NULL,
    senha  VARCHAR(255) NOT NULL,
    role   VARCHAR(20)  NOT NULL DEFAULT 'USER',
    PRIMARY KEY (id)
);
