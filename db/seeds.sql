use vettion;

-- Insertar datos de los dueños
insert into owner (dni_owner, name_owner, surname, phone, email, direction, floor, city, province, postal_code) values 
('12345678A', 'Juan', 'Pérez García', '600111222', 'juan.perez@email.com', 'Calle Mayor 1', '1A', 'Madrid', 'Madrid', '28001'),
('87654321B', 'María', 'García López', '600333444', 'maria.garcia@email.com', 'Avenida de la Constitución 5', '2B', 'Sevilla', 'Sevilla', '41001'),
('11223344C', 'Andrés', 'López Ruiz', '611555666', 'andres.lopez@email.com', 'Plaza España 10', '3C', 'Barcelona', 'Barcelona', '08001');

-- Insertar datos de las mascotas
insert into pet (name_pet, type, breed, weight, sex, birth_date, owner_dni) values
('Rex', 'Perro', 'Pastor Alemán', 32.5, 'Macho', '2021-01-15', '12345678A'),
('Luna', 'Gato', 'Siamés', 4.2, 'Hembra', '2023-03-10', '87654321B'),
('Toby', 'Perro', 'Beagle', 12.0, 'Macho', '2022-04-01', '12345678A'),
('Mora', 'Perro', 'Labrador', 28.3, 'Hembra', '2019-11-20', '87654321B'),
('Simba', 'Gato', 'Persa', 5.1, 'Macho', '2020-06-05', '87654321B'),
('Coco', 'Perro', 'Chihuahua', 2.8, 'Macho', '2023-08-12', '12345678A'),
('Nala', 'Gato', 'Común Europeo', 3.9, 'Hembra', '2021-02-28', '87654321B'),
('Bruno', 'Perro', 'Golden Retriever', 35.0, 'Macho', '2018-05-14', '12345678A'),
('Kira', 'Perro', 'Border Collie', 18.5, 'Hembra', '2022-12-01', '87654321B'),
('Pelusa', 'Conejo', 'Enano Holandés', 1.2, 'Hembra', '2024-01-10', '12345678A');

-- Insertar datos de las alergias
insert into allergy (allergen, diagnostic_method, symptoms, severity_level, emergency_treatment, detection_date) values 
('Polen', 'Prueba cutánea (Skin prick test)', 'Estornudos, ojos rojos, secreción nasal', 'Leve', 'Antihistamínicos según peso', '2025-03-15'),
('Penicilina', 'Reacción clínica previa', 'Ronchas, hinchazón facial, dificultad respiratoria', 'Grave/Crítica', 'Adrenalina y traslado urgente a clínica', '2024-11-10'),
('Ácaros del polvo', 'Analítica de sangre (IgE)', 'Erupciones cutáneas, rascado persistente', 'Moderada', 'Baños con champú medicado y limpieza ambiental', '2026-01-20'),
('Lácteos', 'Dieta de eliminación', 'Diarrea, dolor abdominal, vómitos', 'Moderada', 'Dieta de exclusión y probióticos', '2025-06-05');


-- Insertar datos de las alergias de las mascotas
insert into have_allergy (allergy_id, pet_id) values 
(1, 1), (3, 1), 
(1, 3), (2, 3), (4, 3), 
(3, 2);

-- Insertar datos de los veterinarios
insert into veterinarian (dni_veterinarian, name, surname, phone, address, ss_number, collegiate_number, email, specialty) values
('10101010V', 'Carlos', 'Ruiz', '666111222', 'Calle Mayor 10', 'SS-001V', 'COL-500', 'carlos@vettion.com', 'Cirugía'),
('20202020W', 'Elena', 'Sanz', '666333444', 'Av. Madrid 5', 'SS-002V', 'COL-501', 'elena@vettion.com', 'General');

-- Insertar datos de las consultas
insert into consult (name, consult_type, duration, base_price, description) values 
('Revisión General', 'Revisión', 30, 35.00, 'Chequeo rutinario de salud'),
('Cirugía Menor', 'Cirugía', 120, 150.00, 'Intervención con anestesia local'),
('Vacunación', 'Revisión', 15, 25.00, 'Vacuna anual obligatoria');

-- Insertar datos de las citas
insert into appointment (date_appointment, start_time, end_time, consult_room, observations, pet_id, consult_id, veterinarian_dni) values 
('2026-05-15', '10:00:00', '10:30:00', 'consulta 1', 'Vacuna de la rabia', 1, 3, '20202020W'),
('2026-05-15', '11:00:00', '11:30:00', 'consulta 2', 'Revisión de oídos', 3, 1, '10101010V'),
('2026-05-15', '12:00:00', '13:00:00', 'Peluquería', 'Baño y corte pelo largo', 1, 3, '10101010V'),
('2026-05-20', '09:30:00', '10:00:00', 'consulta 1', 'Seguimiento post-vacuna', 1, 3, '20202020W'),
('2026-06-01', '17:00:00', '17:30:00', 'consulta 2', 'Chequeo desparasitación', 1, 3, '10101010V'),
('2026-05-15', '16:00:00', '16:30:00', 'consulta 1', 'Corte de uñas', 2, 3, '20202020W'),
('2026-05-18', '10:00:00', '11:00:00', 'Peluquería', 'Lavado higiénico', 2, 3, '10101010V'),
('2026-05-25', '11:30:00', '12:00:00', 'consulta 2', 'Revisión anual', 2, 1, '10101010V'),
('2026-05-15', '13:00:00', '14:00:00', 'Quirófano A', 'Limpieza dental', 4, 3, '20202020W');


-- Insertar datos del personal de limpieza
insert into cleaner (dni_cleaner, name, surname, phone, address, ss_number, email) values 
('33445566L', 'Pedro', 'Gómez', '655000111', 'Calle Falsa 123', 'SS-L01', 'pedro@vettion.com');

-- Insertar datos de las limpiezas
insert into clean_service (date_service, start_time, end_time, observations, appointment_id, cleaner_dni) values 
('2026-05-15', '10:40:00', '10:55:00', 'Limpieza estándar post-consulta', 1, '33445566L');