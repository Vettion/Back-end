drop database if exists vettion;
create database vettion;
use vettion;

-- Tabla de dueños.
create table if not exists owner (
    dni_owner varchar(9) primary key,
    name_owner varchar(100) not null,
    surname varchar(100) not null,
    phone varchar(15) not null,
    email varchar(100)
);

-- Tabla de mascotas.
create table if not exists pet (
    id_pet int auto_increment primary key,
    name_pet varchar(100) not null,
    type varchar(100) not null,
    breed varchar(100),
    weight decimal(5,2) not null,
    sex varchar(20) not null,
    birth_date date not null,

    owner_dni varchar(9),
    constraint fk_owner_pet 
        foreign key (owner_dni) references owner(dni_owner) on delete cascade
);

-- Tabla de alergias
create table if not exists allergy (
    id_allergy int auto_increment primary key,
    allergen varchar(100) not null,
    diagnostic_method varchar(100) not null,
    symptoms text,
    severity_level varchar(20) not null,
    emergency_treatment varchar(225) not null,
    detection_date date not null
);

-- Tabla intermedia de alergias de las mascotas
create table if not exists have_allergy (
    id_have_allergy int auto_increment primary key,

    allergy_id int,
    pet_id int,
    constraint fk_allergy_have_allergy
        foreign key (allergy_id) references allergy (id_allergy) on delete cascade,
    constraint fk_pet_have_allergy
        foreign key (pet_id) references pet (id_pet) on delete cascade
);

-- Tabla de veterinarios.
create table if not exists veterinarian (
    dni_veterinarian varchar(9) primary key,
    name varchar(100) not null,
    surname varchar(100) not null,
    phone varchar(15) not null,
    address varchar(100) not null,  
    ss_number varchar(100) not null,
    collegiate_number varchar(100) not null,
    email varchar(100) not null,
    specialty varchar(100) not null
);

-- Tabla de consultas.
create table if not exists consult (
    id_consult int auto_increment primary key,
    name varchar(100) not null,
    consult_type varchar(100) not null,
    duration int not null,
    base_price double(10, 2) not null,
    description text
);

-- Tabla de citas.
create table if not exists appointment (
    id_appointment int auto_increment primary key,
    date_appointment date not null,
    start_time time not null,
    end_time time,
    consult_room varchar(50),
    observations varchar(255),
    
    pet_id int,
    consult_id int,
    veterinarian_dni varchar(9),
    constraint fk_pet_appointment 
        foreign key (pet_id) references pet(id_pet) on delete cascade,
    constraint fk_consult_appointment 
        foreign key (consult_id) references consult(id_consult) on delete cascade,
    constraint fk_veterinarian_appointment 
        foreign key (veterinarian_dni) references veterinarian(dni_veterinarian) on delete cascade
);

-- Tabla de empleados de la limpieza
create table if not exists cleaner (
    dni_cleaner varchar(9) primary key,
    name varchar(100) not null,
    surname varchar(100) not null,
    phone varchar(15) not null,
    address varchar(100) not null,
    ss_number varchar(100) not null,
    email varchar(100) not null
);

-- Tabla de agendar limpieza de la sala
create table if not exists clean_service (
    id_clean_service int auto_increment primary key,
    date_service date not null,
    start_time time not null,
    end_time time,
    observations varchar(255),

    appointment_id int,
    cleaner_dni varchar(9),
    constraint fk_appointment_clean_service 
        foreign key (appointment_id) references appointment(id_appointment) on delete cascade,
    constraint fk_cleaner_clean_service 
        foreign key (cleaner_dni) references cleaner(dni_cleaner) on delete cascade
);