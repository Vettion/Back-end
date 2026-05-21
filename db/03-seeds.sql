use vettion;

DELIMITER //

create or replace procedure load_plan(in p_clean_tables boolean)
begin
    declare exit handler for sqlexception
    begin
        rollback;
        select 'No se pudo cargar el plan de contigencia. Se revierten los cambios.' as result;
    end;

    start transaction;

    set foreign_key_checks=0;

    if p_clean_tables = TRUE then
        truncate table register;
        truncate table clean_service;
        truncate table cleaner;
        truncate table appointment;
        truncate table room;
        truncate table service;
        truncate table veterinarian;
        truncate table have_pathology;
        truncate table pathology;
        truncate table pet;
        truncate table owner;
    end if;
    -- Insert owners data
    insert into owner (dni_owner, name_owner, surname, birth_date, phone, email, direction, floor, city, province, postal_code) values
    ('12345678A', 'Carlos', 'García Pérez', '1985-04-12', '600111222', 'carlos.garcia@email.com', 'Calle Mayor 15', '2B', 'Zaragoza', 'Zaragoza', '50001'),
    ('23456789B', 'María', 'López Martínez', '1990-08-23', '611222333', 'maria.lopez@email.com', 'Avenida Madrid 42', '4A', 'Zaragoza', 'Zaragoza', '50010'),
    ('34567890C', 'Javier', 'Rodríguez Soler', '1978-11-05', '622333444', 'javi.rod@email.com', 'Calle Alfonso I 8', '3º Izq', 'Zaragoza', 'Zaragoza', '50003'),
    ('45678901D', 'Ana', 'Fernández Ruiz', '1993-02-28', '633444555', 'ana.fer@email.com', 'Paseo Sagasta 23', '1C', 'Zaragoza', 'Zaragoza', '50006'),
    ('56789012E', 'Luis', 'Sánchez Gómez', '1982-06-15', '644555666', 'luis.sanchez@email.com', 'Calle Delicias 4', 'Bajo A', 'Zaragoza', 'Zaragoza', '5017'),
    ('67890123F', 'Elena', 'Benítez Toro', '1989-09-09', '655666777', 'elena.b@email.com', 'Calle Goya 12', '5º', 'Utebo', 'Zaragoza', '50180');

    -- Insert pets data
    insert into pet (name_pet, type, breed, weight, sex, birth_date, age, register_date, owner_dni) values
    ('Thor', 'Dog', 'German Shepherd', 32.50, 'Male', '2019-04-12', 7, '2019-08-20', '12345678A'),
    ('Luna', 'Cat', 'Siamese', 4.20, 'Female', '2021-02-10', 5, '2021-05-15', '12345678A'),
    ('Max', 'Dog', 'Golden Retriever', 28.10, 'Male', '2018-11-05', 7, '2019-01-10', '23456789B'),
    ('Mia', 'Cat', 'Persian', 3.80, 'Female', '2023-01-22', 3, '2023-04-02', '34567890C'),
    ('Rocky', 'Dog', 'Chihuahua', 2.50, 'Male', '2022-06-30', 3, '2022-09-12', '45678901D'),
    ('Kira', 'Dog', 'Labrador Retriever', 25.40, 'Female', '2020-08-14', 5, '2020-11-01', '56789012E');

    -- Insert pathologies data
    insert into pathology (name, type, diagnostic_method, symptoms, severity_level, treatment, is_chronic, detection_date) values
    ('Flea Allergy', 'Allergy', 'Skin test', 'Severe itching, hair loss on back', 'Mild', 'Strict antiparasitic treatment and corticosteroids', false, '2022-05-10'),
    ('Atopic Dermatitis', 'Immunological', 'Food exclusion', 'Skin redness, chronic scratching', 'Moderate', 'Medicated shampoo and daily Apoquel', true, '2021-08-14'),
    ('Otitis Externa', 'Infection', 'Ear cytology', 'Head shaking, bad smell from ears', 'Mild', 'Cleaning and antibiotic drops for 10 days', false, '2024-03-22'),
    ('Renal Failure', 'Chronic', 'Blood and urine tests', 'Polyuria, polydipsia, weight loss', 'Severe', 'Strict renal diet and intermittent fluid therapy', true, '2023-11-02'),
    ('Diabetes Mellitus', 'Endocrine', 'Glucose curve', 'Increased appetite, lethargy', 'Severe', 'Daily canine insulin and diet control', true, '2020-01-15'),
    ('Gastroenteritis', 'Infection', 'Examination and ultrasound', 'Vomiting and watery diarrhea', 'Moderate', 'Fasting, bland diet and antibiotics', false, '2025-01-10');

    -- Insert pets' pathology relations
    insert into have_pathology (pathology_id, pet_id) values
    (1, 1), (6, 1), (3, 2), (2, 2), (2, 3), (1, 4);

    -- Insert veterinarians data
    insert into veterinarian (dni_veterinarian, name, surname, phone, address, ss_number, collegiate_number, email, speciality) values
    ('98765432Z', 'Roberto', 'Sanz Peña', '699111222', 'Av. Goya 45', 'SS-1234567890', 'COL-50123', 'roberto.sanz@clinicavet.com', 'General Surgery'),
    ('87654321X', 'Alicia', 'Montero Gil', '688222333', 'Calle Delicias 12', 'SS-2345678901', 'COL-50456', 'alicia.m@clinicavet.com', 'Dentistry'),
    ('76543210W', 'Marcos', 'Giménez Rey', '677333444', 'Paseo Sagasta 3', 'SS-3456789012', 'COL-50789', 'marcos.g@clinicavet.com', 'Internal Medicine'),
    ('65432109V', 'Clara', 'Vidal Palacios', '666444555', 'Calle Alfonso I 22', 'SS-4567890123', 'COL-50111', 'clara.vidal@clinicavet.com', 'Feline Medicine'),
    ('54321098U', 'Ricardo', 'Blasco Soler', '655555666', 'Calle Camino de las Torres 8', 'SS-5678901234', 'COL-50222', 'ricardo.b@clinicavet.com', 'Radiology'),
    ('43210987T', 'Patricia', 'Fuentes Cruz', '644666777', 'Av. América 50', 'SS-6789012345', 'COL-50333', 'patricia.f@clinicavet.com', 'Exotics');

    -- Insert services data
    insert into service (name, service_type, duration, base_price, description) values 
    ('General Consultation', 'Internal Medicine', 20, 35.00, 'General health check and vitals'),
    ('Rabies Vaccination', 'Internal Medicine', 15, 25.50, 'Administration of mandatory rabies vaccine'),
    ('X-Ray Examination', 'Radiology', 30, 65.00, 'Diagnostic radiography and evaluation'),
    ('Dental Cleaning', 'Dentistry', 60, 120.00, 'Ultrasonic dental cleaning under anesthesia'),
    ('Neutering Surgery', 'General Surgery', 45, 90.00, 'Scheduled orchiectomy/spay surgery'),
    ('Feline Consultation', 'Feline Medicine', 60, 150.00, 'Specialized feline health evaluation');

    -- Insert rooms data
    insert into room (name, type, is_free, location) values 
    ('Consultation 1', 'Internal Medicine', true, 'Ground Floor - Left Wing'),
    ('Dentistry Room', 'Dentistry', true, 'Ground Floor - Left Wing'),
    ('Consultation 3 (Cats)', 'Feline Medicine', true, 'Ground Floor - Right Wing'),
    ('Operating Room A', 'General Surgery', false, '1st Floor - Sterile Zone'),
    ('Operating Room B', 'General Surgery', true, '1st Floor - Sterile Zone'),
    ('X-ray Room', 'Radiology', true, 'Ground Floor - Interior');

    -- Insert appointments data
    insert into appointment (date_appointment, start_time, end_time, observations, pet_id, service_id, veterinarian_dni, code_room) values 
    ('2026-05-20', '09:00:00', '09:20:00', 'Annual check-up and pending vaccines.', 1, 1, '76543210W', 1),
    ('2026-05-22', '10:00:00', '11:00:00', 'Requires 12-hour fasting for sedation.', 2, 4, '87654321X', 2),
    ('2026-05-25', '11:30:00', '12:00:00', 'Follow-up for limp on right hind leg.', 3, 3, '54321098U', 6),
    ('2026-05-28', '17:00:00', '17:20:00', 'Second opinion for episodes of disorientation.', 4, 1, '76543210W', 1),
    ('2026-06-01', '12:00:00', '12:15:00', 'Mandatory vaccination per schedule.', 5, 2, '76543210W', 1),
    ('2026-06-03', '08:30:00', '09:15:00', 'Scheduled spay. Bring a blanket for postoperative.', 6, 5, '98765432Z', 4),
    ('2026-05-26', '10:00:00', '10:30:00', 'Routine X-Ray assessment.', 1, 3, '54321098U', 6),
    ('2026-05-26', '11:00:00', '12:00:00', 'Specialized feline check-up.', 4, 6, '65432109V', 3),
    ('2026-05-26', '15:00:00', '16:00:00', 'Dental cleaning session.', 5, 4, '87654321X', 2),
    ('2026-05-26', '17:00:00', '17:20:00', 'Follow-up consultation.', 3, 1, '76543210W', 1);

    -- Insert cleaning staff data
    insert into cleaner (dni_cleaner, name, surname, phone, address, ss_number, email) values 
    ('11111111A', 'Rosa', 'Méndez Flores', '622111111', 'Calle San Pablo 14', 'SS-0111222333', 'rosa.mendez@clinicavet.com'),
    ('22222222B', 'Alberto', 'Gallego Ortiz', '633222222', 'Av. América 12', 'SS-0222333444', 'alberto.gallego@clinicavet.com'),
    ('33333333C', 'Carmen', 'Pascual Sanz', '644333333', 'Calle Delicias 88', 'SS-0333444555', 'carmen.pascual@clinicavet.com'),
    ('44444444D', 'Javier', 'Blanco Nieto', '655444444', 'Calle Universitas 5', 'SS-0444555666', 'javier.blanco@clinicavet.com'),
    ('55555555E', 'Lucía', 'Garrido Romero', '666555555', 'Paseo Calanda 21', 'SS-0555666777', 'lucia.garrido@clinicavet.com'),
    ('66666666F', 'Manuel', 'Ortega Torres', '677666666', 'Calle Sobrarbe 45', 'SS-0666777888', 'manuel.ortega@clinicavet.com');

    -- Insert cleaning services data
    insert into clean_service (date_service, start_time, end_time, observations, appointment_id, cleaner_dni) values 
    ('2026-05-20', '09:20:00', '09:40:00', 'Standard disinfection of examination table and floor.', 1, '11111111A'),
    ('2026-05-22', '11:00:00', '11:20:00', 'Deep post-operative cleaning and surface sterilization.', 2, '22222222B'),
    ('2026-05-25', '11:50:00', '12:10:00', 'Collection of materials and cleaning of X-ray room.', 3, '33333333C'),
    ('2026-05-28', '17:30:00', '17:50:00', 'Disinfection of consultation after patient with suspected neurological issue.', 4, '44444444D'),
    ('2026-06-01', '12:15:00', '12:35:00', 'Quick cleaning of Consultation 1 after vaccination.', 5, '55555555E'),
    ('2026-06-03', '09:15:00', '09:35:00', 'Severe surgical disinfection (Operating Room A).', 6, '66666666F'),
    ('2026-05-26', '10:30:00', '10:50:00', 'Cleaning X-ray room.', 7, '11111111A'),
    ('2026-05-26', '12:00:00', '12:20:00', 'Cleaning feline consultation room.', 8, '22222222B'),
    ('2026-05-26', '16:00:00', '16:20:00', 'Deep cleaning after dental procedure.', 9, '33333333C'),
    ('2026-05-26', '17:20:00', '17:40:00', 'Disinfection of consultation 1.', 10, '44444444D');

    insert into register (date_service, observation_appointment, observation_clean_service, pet_id, service_id, veterinarian_dni, cleaner_dni) values
    ('2026-01-15', 'General consultation at the start of the year. Weight check.', 'Standard disinfection of stretcher and scale.', 1, 1, '76543210W', '11111111A'),
    ('2026-01-28', 'Care for deep cut on paw pad (Emergency).', 'Cleaning blood residues on floor and table.', 5, 2, '98765432Z', '22222222B'),
    ('2026-02-10', 'Blood draw for routine analysis.', 'Collection of biological material and disinfection.', 2, 3, '76543210W', '33333333C'),
    ('2026-02-22', 'Nail trim and hygienic ear cleaning for exotic pet.', 'Removal of organic residues in exotics area.', 3, 4, '43210987T', '44444444D'),
    ('2026-03-05', 'Deep dental cleaning due to severe tartar buildup.', 'Complete sterilization of area and dental instruments.', 4, 4, '65432109V', '55555555E'),
    ('2026-03-19', 'Contrast X-ray to rule out intestinal obstruction.', 'X-ray room organized and surfaces disinfected.', 6, 6, '54321098U', '66666666F');

    set foreign_key_checks=1;

    commit;

    select 'Plan de contingencia cargado con exito' as result;

end //

DELIMITER ;

call load_plan(TRUE);