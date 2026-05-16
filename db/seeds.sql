use vettion;

-- Insertar datos de los dueños
insert into owner (dni_owner, name_owner, surname, phone, email, direction, floor, city, province, postal_code) values
('12345678A', 'Carlos', 'García Pérez', '600111222', 'carlos.garcia@email.com', 'Calle Mayor 15', '2B', 'Zaragoza', 'Zaragoza', '50001'),
('23456789B', 'María', 'López Martínez', '611222333', 'maria.lopez@email.com', 'Avenida Madrid 42', '4A', 'Zaragoza', 'Zaragoza', '50010'),
('34567890C', 'Javier', 'Rodríguez Soler', '622333444', 'javi.rod@email.com', 'Calle Alfonso I 8', '3º Izq', 'Zaragoza', 'Zaragoza', '50003'),
('45678901D', 'Ana', 'Fernández Ruiz', '633444555', 'ana.fer@email.com', 'Paseo Sagasta 23', '1C', 'Zaragoza', 'Zaragoza', '50006'),
('56789012E', 'Luis', 'Sánchez Gómez', '644555666', 'luis.sanchez@email.com', 'Calle Delicias 4', 'Bajo A', 'Zaragoza', 'Zaragoza', '50017'),
('67890123F', 'Elena', 'Benítez Toro', '655666777', 'elena.b@email.com', 'Calle Goya 12', '5º', 'Utebo', 'Zaragoza', '50180'),
('78901234G', 'Diego', 'Martín Vaca', '666777888', 'diego.mv@email.com', 'Avenida Cataluña 88', '2A', 'Zaragoza', 'Zaragoza', '50014'),
('89012345H', 'Laura', 'Jiménez Sanz', '677888999', 'laura.js@email.com', 'Calle San Miguel 3', 'Principal', 'Zaragoza', 'Zaragoza', '50001'),
('90123456I', 'Pedro', 'Castro Ortiz', '688999000', 'pedro.castro@email.com', 'Calle Conde Aranda 55', '3B', 'Zaragoza', 'Zaragoza', '50004'),
('01234567J', 'Marta', 'Rubio Peña', '699000111', 'marta.rubio@email.com', 'Paseo Cuéllar 14', '4B', 'Zaragoza', 'Zaragoza', '50007'),
('11223344K', 'Sergio', 'Navarro Gil', '600223344', 'sergio.nav@email.com', 'Calle Corona de Aragón 9', '1º Dcha', 'Zaragoza', 'Zaragoza', '50009'),
('22334455L', 'Sofía', 'Morales Vega', '611334455', 'sofia.mv@email.com', 'Calle León XIII 21', '6C', 'Zaragoza', 'Zaragoza', '50008');

-- Insertar datos de las mascotas
insert into pet (name_pet, type, breed, weight, sex, birth_date, age, register_date, owner_dni) values
('Thor', 'Perro', 'Pastor Alemán', 32.50, 'Macho', '2019-04-12', 7, '2019-08-20', '12345678A'),
('Luna', 'Gato', 'Siamés', 4.20, 'Hembra', '2021-02-10', 5, '2021-05-15', '12345678A'),
('Max', 'Perro', 'Golden Retriever', 28.10, 'Macho', '2018-11-05', 7, '2019-01-10', '23456789B'),
('Mia', 'Gato', 'Persa', 3.80, 'Hembra', '2023-01-22', 3, '2023-04-02', '34567890C'),
('Rocky', 'Perro', 'Chihuahua', 2.50, 'Macho', '2022-06-30', 3, '2022-09-12', '45678901D'),
('Kira', 'Perro', 'Labrador', 25.40, 'Hembra', '2020-08-14', 5, '2020-11-01', '56789012E'),
('Simba', 'Gato', 'Común Europeo', 5.10, 'Macho', '2017-05-19', 9, '2017-07-25', '67890123F'),
('Coco', 'Loro', 'Yaco', 0.45, 'Macho', '2015-03-10', 11, '2016-02-14', '78901234G'),
('Bela', 'Perro', 'Bulldog Francés', 11.20, 'Hembra', '2021-12-01', 4, '2022-02-28', '89012345H'),
('Toby', 'Perro', 'Yorkshire', 3.10, 'Macho', '2016-10-10', 9, '2016-12-05', '90123456I'),
('Nala', 'Gato', 'Bengala', 4.60, 'Hembra', '2022-03-18', 4, '2022-06-20', '01234567J'),
('Lucky', 'Conejo', 'Belier', 1.80, 'Macho', '2024-02-10', 2, '2024-04-01', '11223344K');

-- Insertar datos en patologias
insert into pathology (name, type, diagnostic_method, symptoms, severity_level, treatment, is_chronic, detection_date) values
('Alergia a la pulga', 'Alergia', 'Test cutáneo', 'Prurito intenso, pérdida de pelo en lomo', 'Leve', 'Tratamiento antiparasitario estricto y corticoides', false, '2022-05-10'),
('Dermatitis Atópica', 'Inmunológica', 'Descarte alimentario', 'Enrojecimiento de piel, rascado crónico', 'Moderado', 'Champú medicado y Apoquel diario', true, '2021-08-14'),
('Otitis Externa', 'Infección', 'Citología de oído', 'Sacudidas de cabeza, mal olor en orejas', 'Leve', 'Limpieza y gotas antibióticas por 10 días', false, '2024-03-22'),
('Insuficiencia Renal', 'Crónica', 'Analítica de sangre y orina', 'Poliuria, polidipsia, pérdida de peso', 'Grave', 'Dieta renal estricta y fluidoterapia intermitente', true, '2023-11-02'),
('Diabetes Mellitus', 'Endocrina', 'Curva de glucemia', 'Aumento de apetito, letargo', 'Grave', 'Insulina canina diaria y control de dieta', true, '2020-01-15'),
('Gastroenteritis', 'Infección', 'Exploración y ecografía', 'Vómitos y diarrea líquida', 'Moderado', 'Ayuno, dieta blanda y antibióticos', false, '2025-01-10'),
('Artrosis', 'Degenerativa', 'Radiografía', 'Cojera, dificultad al levantarse', 'Moderado', 'Condroprotectores y antiinflamatorios (Loxicom)', true, '2019-06-18'),
('Asma Felino', 'Respiratoria', 'Placa de tórax', 'Tos seca, sibilancias al respirar', 'Moderado', 'Inhaladores (Fluticasona) en crisis', true, '2022-10-05'),
('Conjuntivitis', 'Infección', 'Test de Schirmer', 'Legañas verdes, ojos rojos', 'Leve', 'Colirio antibiótico 3 veces al día', false, '2024-09-12'),
('Leishmaniasis', 'Parasitaria', 'Test rápido ELISA', 'Lesiones cutáneas, crecimiento excesivo de uñas', 'Grave', 'Alopurinol y Milteforan', true, '2021-07-20'),
('Alergia Alimentaria (Pollo)', 'Alergia', 'Dieta de exclusión', 'Vómitos esporádicos, picor anal', 'Leve', 'Pienso hidrolizado libre de pollo', true, '2023-05-17'),
('Hipotiroidismo', 'Endocrina', 'Analítica T4 total', 'Apatía, aumento de peso injustificado', 'Moderado', 'Levotiroxina sódica diaria', true, '2018-04-30');

-- Insertar datos de las alergias de las mascotas
insert into have_pathology (pathology_id, pet_id) values
(1, 1), (7, 1), (3, 2), (8, 2), (2, 3), (11, 4), (6, 5), (10, 6), (4, 7), (9, 9), (5, 10),(12, 11);

-- Insertar datos de los veterinarios
insert into veterinarian (dni_veterinarian, name, surname, phone, address, ss_number, collegiate_number, email, speciality) values
('98765432Z', 'Roberto', 'Sanz Peña', '699111222', 'Av. Goya 45', 'SS-1234567890', 'COL-50123', 'roberto.sanz@clinicavet.com', 'Cirugía General'),
('87654321X', 'Alicia', 'Montero Gil', '688222333', 'Calle Delicias 12', 'SS-2345678901', 'COL-50456', 'alicia.m@clinicavet.com', 'Dermatología'),
('76543210W', 'Marcos', 'Giménez Rey', '677333444', 'Paseo Sagasta 3', 'SS-3456789012', 'COL-50789', 'marcos.g@clinicavet.com', 'Medicina Interna'),
('65432109V', 'Clara', 'Vidal Palacios', '666444555', 'Calle Alfonso I 22', 'SS-4567890123', 'COL-50111', 'clara.vidal@clinicavet.com', 'Felines (Gatos)'),
('54321098U', 'Ricardo', 'Blasco Soler', '655555666', 'Calle Camino de las Torres 8', 'SS-5678901234', 'COL-50222', 'ricardo.b@clinicavet.com', 'Traumatología'),
('43210987T', 'Patricia', 'Fuentes Cruz', '644666777', 'Av. América 50', 'SS-6789012345', 'COL-50333', 'patricia.f@clinicavet.com', 'Exóticos'),
('32109876S', 'Fernando', 'Lorenzo Mur', '633777888', 'Calle Tomás Bretón 14', 'SS-7890123456', 'COL-50444', 'fernando.l@clinicavet.com', 'Cardiología'),
('21098765R', 'Beatriz', 'Cano Marín', '622888999', 'Calle San José 31', 'SS-8901234567', 'COL-50555', 'beatriz.cano@clinicavet.com', 'Oftalmología'),
('10987654Q', 'Jorge', 'Herrero Villa', '611999000', 'Calle Duquesa Villahermosa 9', 'SS-9012345678', 'COL-50666', 'jorge.h@clinicavet.com', 'Urgencias'),
('09876543P', 'Irene', 'Serrano Costas', '600000111', 'Calle Miguel Servet 44', 'SS-0123456789', 'COL-50777', 'irene.s@clinicavet.com', 'Neurología'),
('12398745M', 'Manuel', 'Garrido Ibáñez', '600778899', 'Av. Tenor Fleta 19', 'SS-1122334455', 'COL-50888', 'manuel.g@clinicavet.com', 'Cirugía General'),
('45612378N', 'Diana', 'Pascual Rios', '611889900', 'Calle Sobrarbe 2', 'SS-6677889900', 'COL-50999', 'diana.p@clinicavet.com', 'Odontología');

-- Insertar datos de los servicios
insert into service (name, service_type, duration, base_price, description) values 
('Consulta General', 'Medicina Interna', 20, 35.00, 'Revisión general de salud y constantes'),
('Vacunación Rabia', 'Medicina Interna', 15, 25.50, 'Administración de vacuna obligatoria contra la rabia'),
('Analítica de Sangre Completa', 'Medicina Interna', 30, 65.00, 'Hemograma completo y perfil bioquímico básico'),
('Limpieza Dental', 'Odontología', 60, 120.00, 'Limpieza bucal con ultrasonidos bajo anestesia'),
('Cirugía de Esterilización (Gato)', 'Cirugía General', 45, 90.00, 'Orquiectomía felina programada'),
('Cirugía de Esterilización (Gata)', 'Cirugía General', 60, 150.00, 'Ovariohisterectomía felina programada'),
('Ecografía Abdominal', 'Medicina Interna', 40, 75.00, 'Exploración ecográfica de órganos abdominales'),
('Radiografía (2 placas)', 'Traumatología', 20, 55.00, 'Estudio radiográfico en dos proyecciones'),
('Consulta Especialista', 'Neurología', 30, 50.00, 'Consulta con especialista en sistema nervioso'),
('Corte de Uñas y Limpieza', 'Exóticos', 15, 12.00, 'Mantenimiento de uñas y limpieza higiénica en pequeños animales'),
('Urgencia', 'Urgencias', 30, 70.00, 'Atención médica inmediata en horario comercial');

-- Insertar datos de las salas
insert into room (name, type, is_free, location) values 
('Consulta 1', 'Consulta', true, 'Planta Baja - Ala Izquierda'),
('Consulta 2', 'Consulta', true, 'Planta Baja - Ala Izquierda'),
('Consulta 3 (Gatos)', 'Consulta felines', true, 'Planta Baja - Ala Derecha'),
('Quirófano A', 'Cirugía', false, 'Planta 1 - Zona Limpia'),
('Quirófano B', 'Cirugía', true, 'Planta 1 - Zona Limpia'),
('Sala de Rayos X', 'Radiología', true, 'Planta Baja - Interior'),
('Sala de Ecografías', 'Diagnóstico', true, 'Planta Baja - Interior'),
('Laboratorio', 'Análisis', true, 'Planta 1 - Ala Derecha'),
('Hospitalización Perros', 'Ingreso', false, 'Planta 1 - Box 1 a 5'),
('Hospitalización Gatos', 'Ingreso', true, 'Planta 1 - Box 6 a 10'),
('Sala de Espera Principal', 'Espera', true, 'Entrada Principal'),
('Peluquería Vet', 'Estética', true, 'Planta Baja - Junto a entrada');

-- Insertar datos de las citas
insert into appointment (date_appointment, start_time, end_time, observations, pet_id, service_id, veterinarian_dni, code_room) values 
('2026-05-20', '09:00:00', '09:20:00', 'Revisión anual y vacunas pendientes.', 1, 1, '76543210W', 1),
('2026-05-22', '10:00:00', '11:00:00', 'Requiere ayuno de 12 horas para sedación.', 2, 4, '45612378N', 5),
('2026-05-25', '11:30:00', '11:50:00', 'Control de cojera en pata trasera derecha.', 3, 8, '54321098U', 6),
('2026-05-28', '17:00:00', '17:30:00', 'Segunda opinión por episodios de desorientación.', 4, 9, '09876543P', 2),
('2026-06-01', '12:00:00', '12:15:00', 'Vacunación obligatoria por calendario.', 5, 2, '76543210W', 1),
('2026-06-03', '08:30:00', '09:30:00', 'Esterilización programada. Traer manta para el postoperatorio.', 6, 6, '98765432Z', 4),
('2026-06-08', '09:15:00', '09:45:00', 'Control rutinario de su insuficiencia renal crónica.', 7, 3, '76543210W', 8),
('2026-06-12', '16:00:00', '16:15:00', 'Recorte de uñas y revisión de pico.', 8, 10, '43210987T', 12),
('2026-06-15', '10:30:00', '11:10:00', 'Ecografía de control por problemas digestivos previos.', 9, 7, '76543210W', 7),
('2026-06-22', '18:00:00', '18:20:00', 'Chequeo general de constantes y peso.', 10, 1, '76543210W', 3),
('2026-07-02', '11:00:00', '11:30:00', 'Ajuste de medicación para el tiroides.', 11, 9, '09876543P', 2),
('2026-07-10', '12:30:00', '12:50:00', 'Primera revisión de conejo joven.', 12, 1, '43210987T', 1);

-- Insertar datos del personal de limpieza
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

-- Insertar datos de las limpiezas
insert into clean_service (date_service, start_time, end_time, observations, appointment_id, cleaner_dni) values 
('2026-05-20', '09:20:00', '09:40:00', 'Desinfección estándar de mesa de exploración y suelo.', 1, '11111111A'),
('2026-05-22', '11:00:00', '11:20:00', 'Limpieza profunda post-operatoria y esterilización de superficies.', 2, '22222222B'),
('2026-05-25', '11:50:00', '12:10:00', 'Recogida de material y limpieza de la sala de Rayos X.', 3, '33333333C'),
('2026-05-28', '17:30:00', '17:50:00', 'Desinfección de consulta tras paciente con sospecha neurológica.', 4, '44444444D'),
('2026-06-01', '12:15:00', '12:35:00', 'Limpieza rápida de Consulta 1 tras vacunación.', 5, '55555555E'),
('2026-06-03', '09:30:00', '09:50:00', 'Desinfección quirúrgica severa (Quirófano A).', 6, '66666666F'),
('2026-06-08', '09:45:00', '10:05:00', 'Limpieza y recogida de residuos biológicos en Laboratorio.', 7, '77777777G'),
('2026-06-12', '16:15:00', '16:35:00', 'Retirada de plumas y desinfección de la zona de exóticos.', 8, '88888888H'),
('2026-06-15', '11:10:00', '11:30:00', 'Limpieza del gel de ecografía en camilla y aparatos.', 9, '99999999I'),
('2026-06-22', '18:20:00', '18:40:00', 'Desinfección de Consulta 3 (especial felinos).', 10, '12312312J'),
('2026-07-02', '11:30:00', '11:50:00', 'Desinfección rutinaria de mesa y tiradores.', 11, '45645645K'),
('2026-07-10', '12:50:00', '13:10:00', 'Limpieza de pelos de conejo en Consulta 1.', 12, '78978978L');

insert into register (date_service, observation_appointment, observation_clean_service, pet_id, service_id, veterinarian_dni, cleaner_dni) values
('2026-01-15', 'Consulta general de inicio de año. Revisión de peso.', 'Desinfección estándar de camilla y báscula.', 1, 1, '76543210W', '11111111A'),
('2026-01-28', 'Atención por corte profundo en almohadilla (Urgencia).', 'Limpieza de restos de sangre en el suelo y mesa.', 5, 11, '10987654Q', '22222222B'),
('2026-02-10', 'Extracción de sangre para analítica rutinaria.', 'Recogida de material biológico y desinfección.', 7, 3, '76543210W', '33333333C'),
('2026-02-22', 'Corte de uñas y limpieza higiénica de oídos a mascota exótica.', 'Retirada de restos orgánicos en zona de exóticos.', 12, 10, '43210987T', '44444444D'),
('2026-03-05', 'Limpieza dental profunda por acumulación severa de sarro.', 'Esterilización completa del área e instrumental odontológico.', 2, 4, '45612378N', '55555555E'),
('2026-03-19', 'Radiografía de contraste para descartar obstrucción intestinal.', 'Sala de rayos X ordenada y superficies desinfectadas.', 3, 8, '54321098U', '66666666F'),
('2026-04-02', 'Cirugía de esterilización programada (Gato). Sin complicaciones.', 'Desinfección quirúrgica post-operatoria en Quirófano B.', 10, 5, '98765432Z', '77777777G'),
('2026-04-18', 'Revisión y ajuste de tratamiento por problemas neurológicos.', 'Consulta ventilada y superficies limpias.', 11, 9, '09876543P', '88888888H'),
('2026-04-30', 'Administración de la vacuna anual obligatoria de la rabia.', 'Mesa de exploración limpia para el siguiente turno.', 6, 2, '76543210W', '99999999I'),
('2026-05-12', 'Ecografía abdomsinal de control preventivo.', 'Limpieza del gel de ecografía en la colchoneta.', 9, 7, '76543210W', '12312312J'),
('2026-05-14', 'Corte de pico y mantenimiento de plumas.', 'Aspirado de plumas y desinfección de la mesa.', 8, 10, '43210987T', '45645645K'),
('2026-05-16', 'Urgencia por sospecha de shock alérgico.', 'Desinfección rápida de la zona de boxes de urgencia.', 4, 11, '10987654Q', '78978978L');

commit;