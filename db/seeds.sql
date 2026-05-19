use vettion;

set foreign_key_checks=0;
-- Insert owners data
insert into owner (dni_owner, name_owner, surname, birth_date, phone, email, direction, floor, city, province, postal_code) values
('12345678A', 'Carlos', 'García Pérez', '1985-04-12', '600111222', 'carlos.garcia@email.com', 'Calle Mayor 15', '2B', 'Zaragoza', 'Zaragoza', '50001'),
('23456789B', 'María', 'López Martínez', '1990-08-23', '611222333', 'maria.lopez@email.com', 'Avenida Madrid 42', '4A', 'Zaragoza', 'Zaragoza', '50010'),
('34567890C', 'Javier', 'Rodríguez Soler', '1978-11-05', '622333444', 'javi.rod@email.com', 'Calle Alfonso I 8', '3º Izq', 'Zaragoza', 'Zaragoza', '50003'),
('45678901D', 'Ana', 'Fernández Ruiz', '1993-02-28', '633444555', 'ana.fer@email.com', 'Paseo Sagasta 23', '1C', 'Zaragoza', 'Zaragoza', '50006'),
('56789012E', 'Luis', 'Sánchez Gómez', '1982-06-15', '644555666', 'luis.sanchez@email.com', 'Calle Delicias 4', 'Bajo A', 'Zaragoza', 'Zaragoza', '5017'),
('67890123F', 'Elena', 'Benítez Toro', '1989-09-09', '655666777', 'elena.b@email.com', 'Calle Goya 12', '5º', 'Utebo', 'Zaragoza', '50180'),
('78901234G', 'Diego', 'Martín Vaca', '1975-01-20', '666777888', 'diego.mv@email.com', 'Avenida Cataluña 88', '2A', 'Zaragoza', 'Zaragoza', '50014'),
('89012345H', 'Laura', 'Jiménez Sanz', '1995-07-14', '677888999', 'laura.js@email.com', 'Calle San Miguel 3', 'Principal', 'Zaragoza', 'Zaragoza', '50001'),
('90123456I', 'Pedro', 'Castro Ortiz', '1988-03-25', '688999000', 'pedro.castro@email.com', 'Calle Conde Aranda 55', '3B', 'Zaragoza', 'Zaragoza', '50004'),
('01234567J', 'Marta', 'Rubio Peña', '1992-12-02', '699000111', 'marta.rubio@email.com', 'Paseo Cuéllar 14', '4B', 'Zaragoza', 'Zaragoza', '50007'),
('11223344K', 'Sergio', 'Navarro Gil', '1981-05-30', '600223344', 'sergio.nav@email.com', 'Calle Corona de Aragón 9', '1º Dcha', 'Zaragoza', 'Zaragoza', '50009'),
('22334455L', 'Sofía', 'Morales Vega', '1994-10-17', '611334455', 'sofia.mv@email.com', 'Calle León XIII 21', '6C', 'Zaragoza', 'Zaragoza', '50008');

-- Insert pets data
insert into pet (name_pet, type, breed, weight, sex, birth_date, age, register_date, owner_dni) values
('Thor', 'Dog', 'German Shepherd', 32.50, 'Male', '2019-04-12', 7, '2019-08-20', '12345678A'),
('Luna', 'Cat', 'Siamese', 4.20, 'Female', '2021-02-10', 5, '2021-05-15', '12345678A'),
('Max', 'Dog', 'Golden Retriever', 28.10, 'Male', '2018-11-05', 7, '2019-01-10', '23456789B'),
('Mia', 'Cat', 'Persian', 3.80, 'Female', '2023-01-22', 3, '2023-04-02', '34567890C'),
('Rocky', 'Dog', 'Chihuahua', 2.50, 'Male', '2022-06-30', 3, '2022-09-12', '45678901D'),
('Kira', 'Dog', 'Labrador Retriever', 25.40, 'Female', '2020-08-14', 5, '2020-11-01', '56789012E'),
('Simba', 'Cat', 'European Shorthair', 5.10, 'Male', '2017-05-19', 9, '2017-07-25', '67890123F'),
('Coco', 'Parrot', 'Macaw', 0.45, 'Male', '2015-03-10', 11, '2016-02-14', '78901234G'),
('Bela', 'Dog', 'French Bulldog', 11.20, 'Female', '2021-12-01', 4, '2022-02-28', '89012345H'),
('Toby', 'Dog', 'Yorkshire Terrier', 3.10, 'Male', '2016-10-10', 9, '2016-12-05', '90123456I'),
('Nala', 'Cat', 'Bengal', 4.60, 'Female', '2022-03-18', 4, '2022-06-20', '01234567J'),
('Lucky', 'Rabbit', 'Lop', 1.80, 'Male', '2024-02-10', 2, '2024-04-01', '11223344K');

-- Insert pathologies data
insert into pathology (name, type, diagnostic_method, symptoms, severity_level, treatment, is_chronic, detection_date) values
('Flea Allergy', 'Allergy', 'Skin test', 'Severe itching, hair loss on back', 'Mild', 'Strict antiparasitic treatment and corticosteroids', false, '2022-05-10'),
('Atopic Dermatitis', 'Immunological', 'Food exclusion', 'Skin redness, chronic scratching', 'Moderate', 'Medicated shampoo and daily Apoquel', true, '2021-08-14'),
('Otitis Externa', 'Infection', 'Ear cytology', 'Head shaking, bad smell from ears', 'Mild', 'Cleaning and antibiotic drops for 10 days', false, '2024-03-22'),
('Renal Failure', 'Chronic', 'Blood and urine tests', 'Polyuria, polydipsia, weight loss', 'Severe', 'Strict renal diet and intermittent fluid therapy', true, '2023-11-02'),
('Diabetes Mellitus', 'Endocrine', 'Glucose curve', 'Increased appetite, lethargy', 'Severe', 'Daily canine insulin and diet control', true, '2020-01-15'),
('Gastroenteritis', 'Infection', 'Examination and ultrasound', 'Vomiting and watery diarrhea', 'Moderate', 'Fasting, bland diet and antibiotics', false, '2025-01-10'),
('Osteoarthritis', 'Degenerative', 'X-ray', 'Limping, difficulty rising', 'Moderate', 'Chondroprotectors and anti-inflammatories (Loxicom)', true, '2019-06-18'),
('Feline Asthma', 'Respiratory', 'Chest X-ray', 'Dry cough, wheezing when breathing', 'Moderate', 'Inhalers (Fluticasone) during crisis', true, '2022-10-05'),
('Conjunctivitis', 'Infection', 'Schirmer test', 'Green discharge, red eyes', 'Mild', 'Antibiotic eye drops 3 times a day', false, '2024-09-12'),
('Leishmaniasis', 'Parasitic', 'Rapid ELISA test', 'Skin lesions, excessive nail growth', 'Severe', 'Allopurinol and Milteforan', true, '2021-07-20'),
('Food Allergy (Chicken)', 'Allergy', 'Elimination diet', 'Occasional vomiting, anal itching', 'Mild', 'Hydrolyzed food without chicken', true, '2023-05-17'),
('Hypothyroidism', 'Endocrine', 'Total T4 test', 'Apathy, unexplained weight gain', 'Moderate', 'Daily levothyroxine sodium', true, '2018-04-30');

-- Insert pets' pathology relations
insert into have_pathology (pathology_id, pet_id) values
(1, 1), (7, 1), (3, 2), (8, 2), (2, 3), (11, 4), (6, 5), (10, 6), (4, 7), (9, 9), (5, 10),(12, 11);

-- Insert veterinarians data
insert into veterinarian (dni_veterinarian, name, surname, phone, address, ss_number, collegiate_number, email, speciality) values
('98765432Z', 'Roberto', 'Sanz Peña', '699111222', 'Av. Goya 45', 'SS-1234567890', 'COL-50123', 'roberto.sanz@clinicavet.com', 'General Surgery'),
('87654321X', 'Alicia', 'Montero Gil', '688222333', 'Calle Delicias 12', 'SS-2345678901', 'COL-50456', 'alicia.m@clinicavet.com', 'Dermatology'),
('76543210W', 'Marcos', 'Giménez Rey', '677333444', 'Paseo Sagasta 3', 'SS-3456789012', 'COL-50789', 'marcos.g@clinicavet.com', 'Internal Medicine'),
('65432109V', 'Clara', 'Vidal Palacios', '666444555', 'Calle Alfonso I 22', 'SS-4567890123', 'COL-50111', 'clara.vidal@clinicavet.com', 'Feline Medicine'),
('54321098U', 'Ricardo', 'Blasco Soler', '655555666', 'Calle Camino de las Torres 8', 'SS-5678901234', 'COL-50222', 'ricardo.b@clinicavet.com', 'Traumatology'),
('43210987T', 'Patricia', 'Fuentes Cruz', '644666777', 'Av. América 50', 'SS-6789012345', 'COL-50333', 'patricia.f@clinicavet.com', 'Exotics'),
('32109876S', 'Fernando', 'Lorenzo Mur', '633777888', 'Calle Tomás Bretón 14', 'SS-7890123456', 'COL-50444', 'fernando.l@clinicavet.com', 'Cardiology'),
('21098765R', 'Beatriz', 'Cano Marín', '622888999', 'Calle San José 31', 'SS-8901234567', 'COL-50555', 'beatriz.cano@clinicavet.com', 'Ophthalmology'),
('10987654Q', 'Jorge', 'Herrero Villa', '611999000', 'Calle Duquesa Villahermosa 9', 'SS-9012345678', 'COL-50666', 'jorge.h@clinicavet.com', 'Emergency'),
('09876543P', 'Irene', 'Serrano Costas', '600000111', 'Calle Miguel Servet 44', 'SS-0123456789', 'COL-50777', 'irene.s@clinicavet.com', 'Neurology'),
('12398745M', 'Manuel', 'Garrido Ibáñez', '600778899', 'Av. Tenor Fleta 19', 'SS-1122334455', 'COL-50888', 'manuel.g@clinicavet.com', 'General Surgery'),
('45612378N', 'Diana', 'Pascual Rios', '611889900', 'Calle Sobrarbe 2', 'SS-6677889900', 'COL-50999', 'diana.p@clinicavet.com', 'Dentistry');

-- Insert services data
insert into service (name, service_type, duration, base_price, description) values 
('General Consultation', 'Internal Medicine', 20, 35.00, 'General health check and vitals'),
('Rabies Vaccination', 'Internal Medicine', 15, 25.50, 'Administration of mandatory rabies vaccine'),
('Complete Blood Work', 'Internal Medicine', 30, 65.00, 'Complete blood count and basic biochemical profile'),
('Dental Cleaning', 'Dentistry', 60, 120.00, 'Ultrasonic dental cleaning under anesthesia'),
('Neutering Surgery (Male Cat)', 'General Surgery', 45, 90.00, 'Scheduled feline orchiectomy'),
('Neutering Surgery (Female Cat)', 'General Surgery', 60, 150.00, 'Scheduled feline spay (ovariohysterectomy)'),
('Abdominal Ultrasound', 'Internal Medicine', 40, 75.00, 'Ultrasound examination of abdominal organs'),
('X-ray (2 views)', 'Traumatology', 20, 55.00, 'Radiographic study in two projections'),
('Specialist Consultation', 'Neurology', 30, 50.00, 'Consultation with a nervous system specialist'),
('Nail Trim and Cleaning', 'Exotics', 15, 12.00, 'Nail maintenance and hygienic cleaning for small animals'),
('Emergency', 'Emergency', 30, 70.00, 'Immediate medical attention during opening hours');

-- Insert rooms data
insert into room (name, type, is_free, location) values 
('Consultation 1', 'Consultation', true, 'Ground Floor - Left Wing'),
('Consultation 2', 'Consultation', true, 'Ground Floor - Left Wing'),
('Consultation 3 (Cats)', 'Feline Consultation', true, 'Ground Floor - Right Wing'),
('Operating Room A', 'Surgery', false, '1st Floor - Sterile Zone'),
('Operating Room B', 'Surgery', true, '1st Floor - Sterile Zone'),
('X-ray Room', 'Radiology', true, 'Ground Floor - Interior'),
('Ultrasound Room', 'Diagnostics', true, 'Ground Floor - Interior'),
('Laboratory', 'Analysis', true, '1st Floor - Right Wing'),
('Dog Ward', 'Ward', false, '1st Floor - Box 1 to 5'),
('Cat Ward', 'Ward', true, '1st Floor - Box 6 to 10'),
('Main Waiting Room', 'Waiting', true, 'Main Entrance'),
('Vet Grooming', 'Grooming', true, 'Ground Floor - Next to entrance');

-- Insert appointments data
insert into appointment (date_appointment, start_time, end_time, observations, pet_id, service_id, veterinarian_dni, code_room) values 
('2026-05-20', '09:00:00', '09:20:00', 'Annual check-up and pending vaccines.', 1, 1, '76543210W', 1),
('2026-05-22', '10:00:00', '11:00:00', 'Requires 12-hour fasting for sedation.', 2, 4, '45612378N', 5),
('2026-05-25', '11:30:00', '11:50:00', 'Follow-up for limp on right hind leg.', 3, 8, '54321098U', 6),
('2026-05-28', '17:00:00', '17:30:00', 'Second opinion for episodes of disorientation.', 4, 9, '09876543P', 2),
('2026-06-01', '12:00:00', '12:15:00', 'Mandatory vaccination per schedule.', 5, 2, '76543210W', 1),
('2026-06-03', '08:30:00', '09:30:00', 'Scheduled spay. Bring a blanket for postoperative.', 6, 6, '98765432Z', 4),
('2026-06-08', '09:15:00', '09:45:00', 'Routine check for chronic renal failure.', 7, 3, '76543210W', 8),
('2026-06-12', '16:00:00', '16:15:00', 'Nail trim and beak check.', 8, 10, '43210987T', 12),
('2026-06-15', '10:30:00', '11:10:00', 'Control ultrasound for previous digestive issues.', 9, 7, '76543210W', 7),
('2026-06-22', '18:00:00', '18:20:00', 'General check of vitals and weight.', 10, 1, '76543210W', 3),
('2026-07-02', '11:00:00', '11:30:00', 'Medication adjustment for thyroid.', 11, 9, '09876543P', 2),
('2026-07-10', '12:30:00', '12:50:00', 'First check-up for young rabbit.', 12, 1, '43210987T', 1);

-- Insert cleaning staff data
insert into cleaner (dni_cleaner, name, surname, phone, address, ss_number, email) values 
('11111111A', 'Rosa', 'Méndez Flores', '622111111', 'Calle San Pablo 14', 'SS-0111222333', 'rosa.mendez@clinicavet.com'),
('22222222B', 'Alberto', 'Gallego Ortiz', '633222222', 'Av. América 12', 'SS-0222333444', 'alberto.gallego@clinicavet.com'),
('33333333C', 'Carmen', 'Pascual Sanz', '644333333', 'Calle Delicias 88', 'SS-0333444555', 'carmen.pascual@clinicavet.com'),
('44444444D', 'Javier', 'Blanco Nieto', '655444444', 'Calle Universitas 5', 'SS-0444555666', 'javier.blanco@clinicavet.com'),
('55555555E', 'Lucía', 'Garrido Romero', '666555555', 'Paseo Calanda 21', 'SS-0555666777', 'lucia.garrido@clinicavet.com'),
('66666666F', 'Manuel', 'Ortega Torres', '677666666', 'Calle Sobrarbe 45', 'SS-0666777888', 'manuel.ortega@clinicavet.com'),
('77777777G', 'Francisca', 'Marín Soler', '688777777', 'Av. Madrid 102', 'SS-0777888999', 'paqui.marin@clinicavet.com'),
('88888888H', 'Antonio', 'Medina Vega', '699888888', 'Calle Belchite 3', 'SS-0888999000', 'antonio.medina@clinicavet.com'),
('99999999I', 'Isabel', 'Castillo Peña', '600999999', 'Calle Miguel Servet 12', 'SS-0999000111', 'isabel.castillo@clinicavet.com'),
('12312312J', 'Pedro', 'Cano Rubio', '611123123', 'Calle Juan Pablo II 7', 'SS-1000111222', 'pedro.cano@clinicavet.com'),
('45645645K', 'Silvia', 'Navarro Delgado', '622456456', 'Via Universitas 34', 'SS-1111222333', 'silvia.navarro@clinicavet.com'),
('78978978L', 'José', 'Marín Ruiz', '633789789', 'Calle Conde Aranda 18', 'SS-1222333444', 'jose.marin@clinicavet.com');

-- Insert cleaning services data
insert into clean_service (date_service, start_time, end_time, observations, appointment_id, cleaner_dni) values 
('2026-05-20', '09:20:00', '09:40:00', 'Standard disinfection of examination table and floor.', 1, '11111111A'),
('2026-05-22', '11:00:00', '11:20:00', 'Deep post-operative cleaning and surface sterilization.', 2, '22222222B'),
('2026-05-25', '11:50:00', '12:10:00', 'Collection of materials and cleaning of X-ray room.', 3, '33333333C'),
('2026-05-28', '17:30:00', '17:50:00', 'Disinfection of consultation after patient with suspected neurological issue.', 4, '44444444D'),
('2026-06-01', '12:15:00', '12:35:00', 'Quick cleaning of Consultation 1 after vaccination.', 5, '55555555E'),
('2026-06-03', '09:30:00', '09:50:00', 'Severe surgical disinfection (Operating Room A).', 6, '66666666F'),
('2026-06-08', '09:45:00', '10:05:00', 'Cleaning and collection of biological waste in Laboratory.', 7, '77777777G'),
('2026-06-12', '16:15:00', '16:35:00', 'Removal of feathers and disinfection of exotics area.', 8, '88888888H'),
('2026-06-15', '11:10:00', '11:30:00', 'Cleaning of ultrasound gel on stretcher and devices.', 9, '99999999I'),
('2026-06-22', '18:20:00', '18:40:00', 'Disinfection of Consultation 3 (specialized for felines).', 10, '12312312J'),
('2026-07-02', '11:30:00', '11:50:00', 'Routine disinfection of table and handles.', 11, '45645645K'),
('2026-07-10', '12:50:00', '13:10:00', 'Cleaning rabbit hair in Consultation 1.', 12, '78978978L');

insert into register (date_service, observation_appointment, observation_clean_service, pet_id, service_id, veterinarian_dni, cleaner_dni) values
('2026-01-15', 'General consultation at the start of the year. Weight check.', 'Standard disinfection of stretcher and scale.', 1, 1, '76543210W', '11111111A'),
('2026-01-28', 'Care for deep cut on paw pad (Emergency).', 'Cleaning blood residues on floor and table.', 5, 11, '10987654Q', '22222222B'),
('2026-02-10', 'Blood draw for routine analysis.', 'Collection of biological material and disinfection.', 7, 3, '76543210W', '33333333C'),
('2026-02-22', 'Nail trim and hygienic ear cleaning for exotic pet.', 'Removal of organic residues in exotics area.', 12, 10, '43210987T', '44444444D'),
('2026-03-05', 'Deep dental cleaning due to severe tartar buildup.', 'Complete sterilization of area and dental instruments.', 2, 4, '45612378N', '55555555E'),
('2026-03-19', 'Contrast X-ray to rule out intestinal obstruction.', 'X-ray room organized and surfaces disinfected.', 3, 8, '54321098U', '66666666F'),
('2026-04-02', 'Scheduled neutering surgery (Cat). No complications.', 'Post-operative surgical disinfection in Operating Room B.', 10, 5, '98765432Z', '77777777G'),
('2026-04-18', 'Review and adjustment of treatment for neurological issues.', 'Ventilated consultation and clean surfaces.', 11, 9, '09876543P', '88888888H'),
('2026-04-30', 'Administration of annual mandatory rabies vaccine.', 'Clean examination table for next shift.', 6, 2, '76543210W', '99999999I'),
('2026-05-12', 'Preventive abdominal ultrasound check.', 'Cleaning of ultrasound gel on the mat.', 9, 7, '76543210W', '12312312J'),
('2026-05-14', 'Beak trimming and feather maintenance.', 'Vacuuming feathers and disinfection of the table.', 8, 10, '43210987T', '45645645K'),
('2026-05-16', 'Emergency for suspected allergic shock.', 'Quick disinfection of emergency boxes area.', 4, 11, '10987654Q', '78978978L');

set foreign_key_checks=1;