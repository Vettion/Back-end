-- Insertar los datos de los dueños
insert into owner (dni, name, surname, phone, email) values
('12345678A', 'Juan', 'Pérez', '600111222', 'juan.perez@email.com'),
('87654321B', 'María', 'García', '600333444', 'm.garcia@email.com'),
('11223344C', 'Andrés', 'López', '611555666', 'alopez@email.com'),
('55667788D', 'Beatriz', 'Luna', '622777888', 'b.luna@email.com'),
('99001122E', 'Roberto', 'Maza', '633999000', 'roberto.m@email.com'),
('33441155F', 'Lucía', 'Torres', '644111222', 'lucia.t@email.com'),
('44556677G', 'Sergio', 'Pascual', '688444555', 's.pascual@email.com'),
('22334455H', 'Mónica', 'Vidal', '699222333', 'mvidal@email.com');

-- Insertar los datos de las alergias
insert into allergy (name, description) values 
('Polen', 'Reacción estacional en primavera'),
('Pescado', 'Intolerancia digestiva a proteínas marinas'),
('Lactosa', 'Problemas gástricos con lácteos'),
('Penicilina', 'Reacción alérgixa a este antibiótico'),
('Acaros', 'Polvo acumulado en mantas o alfombras'),
('Picadura Pulga', 'Dermatitis severa por saliva de pulga'),
('Pollo', 'Intolerancia a la proteína de ave'),

-- Insertar los datos de las mascotas
insert into pet (name, type, race, weight, sex, age, dueno_id) values
('Rex', 'Perro', 'Pastor Alemán', 32.5, 'Macho', 5, '12345678A'),
('Luna', 'Gato', 'Siamés', 4.2, 'Hembra', 3, '87654321B'),
('Toby', 'Perro', 'Beagle', 12.0, 'Macho', 1, '12345678A'),
('Misi', 'Gato', 'Persa', 3.8, 'Hembra', 7, '11223344C'), 
('Thor', 'Perro', 'Golden Retriever', 28.3, 'Macho', 4, '55667788D'),
('Nala', 'Gato', 'Maine Coon', 6.5, 'Hembra', 2, '99001122E'),
('Coco', 'Perro', 'Chihuahua', 2.1, 'Macho', 10, '33441155F'),
('Kira', 'Perro', 'Bodeguero', 8.4, 'Hembra', 6, '55667788D'),
('Simba', 'Gato', 'Común Europeo', 4.0, 'Macho', 1, '11223344C'),
('Bruno', 'Perro', 'Boxer', 25.0, 'Macho', 3, '87654321B'),
('Roco', 'Perro', 'Bulldog Francés', 11.2, 'Macho', 2, '44556677G'),
('Perla', 'Gato', 'Angora', 3.5, 'Hembra', 4, '22334455H')

-- Insertar los datos de la relacion de las mascotas-alergias
insert into have_allergy (mascota_id, alergia_id) values 
(1, 1), (2, 2), (3, 1), (3, 3), (5, 5), (6, 6), (7, 7), (10, 5);

-- Insertar los datos de la tabla de los veterinarios
insert into veterinarian (dni, name, surname, phone, address, num_SS, num_colegiado, email, speciality) values
('10101010V', 'Carlos', 'Ruiz', '666111222', 'Calle Mayor 10, Zaragoza', 'SS-001', 'COL-500', 'carlos.ruiz@vettion.com', 'Cirugia'),
('20202020W', 'Elena', 'Sanz','666333444', 'Av. Madrid 5, Zaragoza', 'SS-002', 'COL-501', 'elena.sanz@vettion.com', 'Medicina General'),
('40404040X', 'Marta', 'Ibáñez', '666555111', 'Calle Coso 50, Zaragoza', 'SS-003', 'COL-502', 'marta.ibañez@vettion.com', 'Dermatologia'),
('50505050Y', 'Javier', 'Gómez', '666999222', 'Paseo Sagasta 12, Zaragoza', 'SS-004', 'COL-503', 'javier.g@vettion.com', 'Odontología'),
('60606060Z', 'Fernando', 'Beltran', '666111999', 'Calle Alfonso I 3, Zaragoza', 'SS-005', 'COL-504', 'f.beltran@vettion.com', 'Traumatología');

-- Insertar los datos de la tabla de sala
insert into room (type, name, disponibility) values 
('Consulta', 'Box 1 - General', true),
('Consulta', 'Box 2 - Perros', true),
('Quirófano', 'Sala de cirugía A', true),
('Consulta', 'Box 3 - Exóticos', true),
('Laboratorio', 'Sala de Análisis', true),
('Radiología', 'Sala de Rayos X', true);

-- Insertar los datos de la tabla de empleados de limpieza
insert into cleaner (dni, name, surname, phone, address, numm_SS, email) values 
('33445566L', 'Pedro', 'Gómez', '655000111', 'Calle Falsa 123', 'SS-L01', 'pedro.limpieza@vettion.com'),
('77889900M', 'Ana', 'Martínez', '655222333', 'Calle Luna 45', 'SS-L02', 'ana.limpieza@vettion.com');

-- Insertar los datos de la tabla de programacion de la limpieza
insert into clean_service (limpiador_dni, sala_id, fecha_limpieza) values 
('33445566L', 1, '2026-04-22 08:00:00'),
('77889900M', 3, '2026-04-22 07:30:00'),
('33445566L', 2, '2026-04-22 14:00:00'),
('77889900M', 4, '2026-04-22 15:30:00');

-- Insertar los datos de la tabla de citas
insert into appointment (mascota_id, sala_id, veterinario_dni, fecha_hora, precio, motivo) values 
(1, 1, '20202020W', '2026-04-25 10:00:00', 45.00, 'Vacunación anual y chequeo'),
(2, 2, '20202020W', '2026-04-25 11:30:00', 30.00, 'Control de peso'),
(3, 3, '10101010V', '2026-04-26 09:00:00', 150.00, 'Cirugía menor en pata derecha'),
(5, 1, '40404040X', '2026-04-27 10:00:00', 60.00, 'Picazón constante en la piel'),
(11, 3, '60606060Z', '2026-05-02 09:00:00', 95.00, 'Revisión de fractura en pata trasera'),
(12, 1, '60606060Z', '2026-05-02 12:00:00', 40.00, 'Consulta cojera leve');