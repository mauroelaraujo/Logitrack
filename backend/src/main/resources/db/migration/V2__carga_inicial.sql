-- V2: Dados iniciais para testes

INSERT INTO veiculos (placa, modelo, tipo, ano) VALUES
    ('ABC-1234', 'Fiorino',           'LEVE',   2022),
    ('XYZ-9876', 'Volvo FH',          'PESADO',  2021),
    ('KJG-1122', 'Mercedes Sprinter', 'LEVE',   2020),
    ('LMN-4455', 'Scania R500',       'PESADO',  2023),
    ('PQR-3300', 'VW Delivery',       'LEVE',   2021),
    ('STU-7788', 'Iveco Daily',       'LEVE',   2019),
    ('VWX-5544', 'DAF XF',            'PESADO',  2022),
    ('YZA-6611', 'Ford Cargo 2429',   'PESADO',  2020),
    ('BCD-8899', 'Renault Master',    'LEVE',   2023),
    ('EFG-2233', 'MAN TGX',           'PESADO',  2021),
    ('HIJ-4477', 'Fiat Ducato',       'LEVE',   2022);

INSERT INTO viagens (veiculo_id, data_saida, data_chegada, origem, destino, km_percorrida) VALUES
    (1, '2024-05-01 08:00:00', '2024-05-01 18:00:00', 'São Paulo',      'Rio de Janeiro', 435.00),
    (1, '2024-05-05 09:00:00', '2024-05-05 12:00:00', 'Rio de Janeiro', 'Niterói',         20.50),
    (2, '2024-05-02 05:00:00', '2024-05-03 20:00:00', 'Curitiba',       'Belo Horizonte', 1000.00),
    (4,  '2024-06-03 06:00:00', '2024-06-04 10:00:00', 'Belo Horizonte', 'Brasília',        716.00),
    (9,  '2024-06-05 08:30:00', '2024-06-05 17:00:00', 'São Paulo',      'Santos',           72.00),
    (9,  '2024-06-07 09:00:00', '2024-06-07 14:00:00', 'Curitiba',       'Londrina',        380.00),
    (9,  '2024-06-10 04:00:00', '2024-06-11 18:00:00', 'Porto Alegre',   'São Paulo',      1109.00),
    (9,  '2024-06-12 07:00:00', '2024-06-13 12:00:00', 'Salvador',       'Recife',          839.00),
    (9,  '2024-06-14 08:00:00', '2024-06-14 16:00:00', 'Fortaleza',      'Natal',           537.00),
    (10, '2024-06-15 06:00:00', '2024-06-16 20:00:00', 'São Paulo',      'Manaus',         3800.00),
    (11, '2024-06-17 09:00:00', '2024-06-17 13:00:00', 'Rio de Janeiro', 'Petrópolis',       68.00),
    (1,  '2024-07-01 08:00:00', '2024-07-01 18:30:00', 'São Paulo',      'Rio de Janeiro',  435.00),
    (2,  '2024-07-03 05:00:00', '2024-07-04 22:00:00', 'Porto Alegre',   'Belo Horizonte', 1450.00),
    (4,  '2024-07-08 06:00:00', '2024-07-09 14:00:00', 'Brasília',       'Goiânia',         209.00),
    (9,  '2024-07-10 07:30:00', '2024-07-10 11:00:00', 'São Paulo',      'Sorocaba',         98.00),
    (3,  '2024-07-12 08:00:00', '2024-07-12 17:00:00', 'Campinas',       'Rio de Janeiro',  500.00),
    (9,  '2024-07-15 09:00:00', '2024-07-15 16:00:00', 'Curitiba',       'Florianópolis',   300.00),
    (9,  '2024-07-18 04:30:00', '2024-07-20 10:00:00', 'São Paulo',      'Recife',         2660.00),
    (9,  '2024-07-20 08:00:00', '2024-07-21 18:00:00', 'Recife',         'Salvador',        839.00);


INSERT INTO manutencoes (veiculo_id, data_inicio, data_finalizacao, tipo_servico, custo_estimado, status) VALUES
    (1, '2024-06-10', '2024-06-11', 'Troca de Óleo',    350.00,  'PENDENTE'),
    (2, '2024-06-15', '2024-06-17', 'Revisão de Freios',1500.00, 'PENDENTE'),
    (3, '2024-05-20', '2024-05-20', 'Troca de Pneus',   2200.00, 'CONCLUIDA'),
    (4,  '2024-06-05', '2024-06-06', 'Troca de Óleo',              400.00, 'CONCLUIDA'),
    (9,  '2024-06-18', '2024-06-19', 'Revisão Geral',             1200.00, 'CONCLUIDA'),
    (9,  '2024-06-20', '2024-06-21', 'Troca de Filtros',           320.00, 'PENDENTE'),
    (9,  '2024-06-22', '2024-06-24', 'Troca de Pneus',            3000.00, 'EM_REALIZACAO'),
    (9,  '2024-06-25', '2024-06-26', 'Revisão de Freios',         1800.00, 'PENDENTE'),
    (9,  '2024-07-01', '2024-07-02', 'Troca de Óleo',              380.00, 'CONCLUIDA'),
    (10, '2024-07-03', '2024-07-05', 'Revisão Geral',             2500.00, 'EM_REALIZACAO'),
    (11, '2024-07-06', '2024-07-06', 'Troca de Filtros',           290.00, 'CONCLUIDA'),
    (1,  '2024-07-10', '2024-07-11', 'Substituição de Correia',    950.00, 'PENDENTE'),
    (2,  '2024-07-12', '2024-07-14', 'Revisão de Suspensão',      2100.00, 'EM_REALIZACAO'),
    (3,  '2024-07-15', '2024-07-15', 'Troca de Óleo',              350.00, 'CONCLUIDA'),
    (4,  '2024-07-18', '2024-07-20', 'Troca de Pneus',            2800.00, 'PENDENTE'),
    (4,  '2024-07-22', '2024-07-22', 'Revisão de Freios',          900.00, 'CONCLUIDA'),
    (4,  '2024-07-25', '2024-07-26', 'Substituição de Bateria',    650.00, 'PENDENTE'),
    (4,  '2024-07-28', '2024-07-30', 'Revisão Geral',             3200.00, 'EM_REALIZACAO'),
    (4,  '2024-08-01', '2024-08-01', 'Troca de Óleo',              420.00, 'PENDENTE'),
    (9,  '2024-08-03', '2024-08-04', 'Revisão de Suspensão',      1700.00, 'PENDENTE');
