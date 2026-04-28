-- Inserts servicios
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

-- Inserts dueños
insert into owner (dni_owner, name, surname, phone, email) values
('12345678A', 'Juan', 'Pérez', '600111222', 'juan.perez@email.com'),
('87654321B', 'María', 'García', '600333444', 'm.garcia@email.com'),
('11223344C', 'Andrés', 'López', '611555666', 'alopez@email.com'),
('55667788D', 'Beatriz', 'Luna', '622777888', 'b.luna@email.com'),
('99001122E', 'Roberto', 'Maza', '633999000', 'roberto.m@email.com'),
('33441155F', 'Lucía', 'Torres', '644111222', 'lucia.t@email.com'),
('44556677G', 'Sergio', 'Pascual', '688444555', 's.pascual@email.com'),
('22334455H', 'Mónica', 'Vidal', '699222333', 'mvidal@email.com');

-- Inserts veterinarios
insert into veterinarian (dni_veterinarian, name, surname, phone, address, ss_number, num_collegiate, email, speciality) values
('10101010V', 'Carlos', 'Ruiz', '666111222', 'Calle Mayor 10, Zaragoza', 'SS-001', 'COL-500', 'carlos.ruiz@vettion.com', 'Cirugia'),
('20202020W', 'Elena', 'Sanz','666333444', 'Av. Madrid 5, Zaragoza', 'SS-002', 'COL-501', 'elena.sanz@vettion.com', 'Medicina General'),
('40404040X', 'Marta', 'Ibáñez', '666555111', 'Calle Coso 50, Zaragoza', 'SS-003', 'COL-502', 'marta.ibañez@vettion.com', 'Dermatologia');

-- Inserts limpiadores
insert into cleaner (dni_cleaner, name, surname, phone, address, ss_number, email) values 
('33445566L', 'Pedro', 'Gómez', '655000111', 'Calle Falsa 123', 'SS-L01', 'pedro.limpieza@vettion.com'),
('77889900M', 'Ana', 'Martínez', '655222333', 'Calle Luna 45', 'SS-L02', 'ana.limpieza@vettion.com');

-- Inserts mascotas
insert into pet (name, type, pet_breed, weight, sex, birth_date, owner_dni) values
('Rex', 'Perro', 'Pastor Alemán', 32.5, 'Macho', '2021-01-15', '12345678A'),
('Luna', 'Gato', 'Siamés', 4.2, 'Hembra', '2023-03-10', '87654321B'),
('Toby', 'Perro', 'Beagle', 12.0, 'Macho', '2025-04-01', '12345678A'),
('Misi', 'Gato', 'Persa', 3.8, 'Hembra', '2019-06-20', '11223344C'), 
('Thor', 'Perro', 'Golden Retriever', 28.3, 'Macho', '2022-11-05', '55667788D');

-- Inserts alergias
insert into allergy (name, description) values 
('Polen', 'Reacción estacional en primavera'),
('Penicilina', 'Reacción alérgica a este antibiótico');

-- Inserts alergias de las mascotas
insert into have_allergy (pet_id, allergy_id) values 
(1, 1), (3, 1), (3, 2);

-- Inserts salas vinculadas a servicios
insert into room (name, disponibility, service_id) values 
('Box 1 - General', true, 1),
('Box 2 - Vacunas', true, 3),
('Sala de cirugía A', true, 7);

-- Inserts citas
insert into appointment (appointment_date, start_hour, end_hour, observations, pet_id, room_id, veterinarian_dni) values 
('2026-04-25', '10:00:00', '10:30:00', 'Vacunación anual y chequeo', 1, 1, '20202020W'),
('2026-04-25', '11:30:00', '11:50:00', 'Control de peso', 2, 2, '20202020W'),
('2026-04-26', '09:00:00', '10:30:00', 'Cirugía menor', 3, 3, '10101010V');

-- Inserts limpiezas de las salas
insert into clean_service (clean_date, start_hour, end_hour, observations, cleaner_dni, appointment_id, room_id) values 
('2026-04-25', '10:35:00', '10:50:00', 'Limpieza post-vacunación', '33445566L', 1, 1),
('2026-04-25', '12:00:00', '12:15:00', 'Desinfección rutinaria', '77889900M', 2, 2),
('2026-04-26', '10:45:00', '11:30:00', 'Limpieza profunda tras cirugía', '33445566L', 3, 3);