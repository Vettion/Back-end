-- Insertar los datos de la tabla de los servicios
insert into service(name_service, price, description) values 
('Consulta General', 35.00, 'Revisión rutinaria de salud'),
('Urgencias', 70.00, 'Atención médica inmediata fuera de horario'),
('Vacunación Anual', 45.00, 'Vacunas obligatorias anuales'),
('Vacuna Rabia', 25.00, 'Inmunización específica contra la rabia'),
('Limpieza Dental', 120.00, 'Limpieza por ultrasonidos y pulido'),
('Cirugía Menor', 150.00, 'Procedimientos sencillos con anestesia local'),
('Cirugía Mayor', 450.00, 'Procedimientos complejos con anestesia general'),
('Radiografía', 85.00, 'Estudio radiológico completo'),
('Analítica de Sangre', 60.00, 'Hemograma y bioquímica completa'),
('Peluquería y baño', 30.00, 'Corte de pelo profesional y baño higíenico');

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
('Penicilina', 'Reacción alérgica a este antibiótico'),
('Acaros', 'Polvo acumulado en mantas o alfombras'),
('Picadura Pulga', 'Dermatitis severa por saliva de pulga'),
('Pollo', 'Intolerancia a la proteína de ave');

-- Insertar los datos de las mascotas
insert into pet (name, type, race, weight, sex, age, owner_dni) values
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
('Perla', 'Gato', 'Angora', 3.5, 'Hembra', 4, '22334455H');

-- Insertar los datos de la relacion de las mascotas-alergias
insert into have_allergy (pet_id, allergy_id) values 
(1, 1), (2, 2), (3, 1), (3, 3), (5, 5), (6, 6), (7, 7), (10, 5);

-- Insertar los datos de la tabla de los veterinarios
insert into veterinarian (dni, name, surname, phone, address, SS_number, num_collegiate, email, speciality) values
('10101010V', 'Carlos', 'Ruiz', '666111222', 'Calle Mayor 10, Zaragoza', 'SS-001', 'COL-500', 'carlos.ruiz@vettion.com', 'Cirugia'),
('20202020W', 'Elena', 'Sanz','666333444', 'Av. Madrid 5, Zaragoza', 'SS-002', 'COL-501', 'elena.sanz@vettion.com', 'Medicina General'),
('30303030X', 'Marta', 'Ibáñez', '666555111', 'Calle Coso 50, Zaragoza', 'SS-003', 'COL-502', 'marta.ibañez@vettion.com', 'Dermatologia'),
('40404040Y', 'Javier', 'Gómez', '666999222', 'Paseo Sagasta 12, Zaragoza', 'SS-004', 'COL-503', 'javier.g@vettion.com', 'Odontología'),
('50505050Z', 'Fernando', 'Beltran', '666111999', 'Calle Alfonso I 3, Zaragoza', 'SS-005', 'COL-504', 'f.beltran@vettion.com', 'Traumatología');

-- Insertar los datos de la tabla de sala
insert into consult (id_consult, type, name, duration, price, description) values 
(1, 'Consulta', 'Box 1 - General', 30, 35.00, 'Revisión rutinaria de salud'),
(2, 'Consulta', 'Box 2 - Perros', 45, 60.00, 'Vacunación anual'),
(3, 'Quirófano', 'Sala de cirugía A', 120, 150.00, 'Cirugía menor'),
(4, 'Consulta', 'Box 3 - Exóticos', 30, 35.00, 'Revisión rutinaria de salud'),
(5, 'Laboratorio', 'Sala de Análisis', 60, 60.00, 'Analítica de sangre'),
(6, 'Radiología', 'Sala de Rayos X', 20, 45.00, 'Radiografía');

-- Insertar los datos de la tabla de empleados de limpieza
insert into cleaner (dni, name, surname, phone, address, SS_number, email) values 
('33445566L', 'Pedro', 'Gómez', '655000111', 'Calle Falsa 123', 'SS-L01', 'pedro.limpieza@vettion.com'),
('77889900M', 'Ana', 'Martínez', '655222333', 'Calle Luna 45', 'SS-L02', 'ana.limpieza@vettion.com');

-- Insertar los datos de la tabla de programacion de la limpieza
insert into clean_service (day, hour_start, cleaner_dni, room_id) values 
('2026-04-22', '08:00:00', '33445566L', 1),
('2026-04-22', '07:30:00', '77889900M', 3),
('2026-04-22', '14:00:00', '33445566L', 2),
('2026-04-22', '15:30:00', '77889900M', 4);

-- Insertar los datos de la tabla de citas
insert into appointment (appointment_date, start_hour, duration, reason, pet_id, room_id, veterinarian_dni) values 
('2026-04-25', '10:00:00', 30, 'Vacunación anual y chequeo', 1, 1, '20202020W'),
('2026-04-25', '11:30:00', 20, 'Control de peso', 2, 2, '20202020W'),
('2026-04-26', '09:00:00', 90, 'Cirugía menor en pata derecha', 3, 3, '10101010V'),
('2026-04-27', '10:00:00', 45, 'Picazón constante en la piel', 5, 1, '40404040X'),
('2026-05-02', '09:00:00', 60, 'Revisión de fractura en pata trasera', 11, 3, '60606060Z'),
('2026-05-02', '12:00:00', 15, 'Consulta cojera leve', 12, 1, '60606060Z');