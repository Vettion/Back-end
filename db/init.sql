create database if not exists vettion;
use vettion;

-- Tabla de dueños
create table if not exists owner (
    dni_owner varchar(9) primary key,
    name varchar(100) not null,
    surname varchar(100) not null,
    phone varchar(15) not null,
    email varchar(100)
);

-- Tabla de mascotas
create table if not exists pet (
    id_pet int auto_increment primary key,
    name varchar(100) not null,
    type varchar(100) not null,
    pet_breed varchar(100) not null,
    weight decimal(5,2) not null,
    sex varchar(20) not null,
    birth_date date,

    owner_dni varchar(9),
    constraint fk_owner_pet
        foreign key (owner_dni) references owner(dni_owner) on delete cascade
);

-- Tabla de alergias
create table if not exists allergy (
    id_allergy int auto_increment primary key,
    name varchar(100) not null,
    description text not null
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
    num_collegiate varchar(100) not null,
    email varchar(100) not null, 
    speciality varchar(100) not null
);

-- Tabla de servicios
create table if not exists service (
    id_service int auto_increment primary key,
    name_service varchar(100) not null,
    price decimal(7,2) not null,
    description text
);

-- Tabla de salas
create table if not exists room (
    id_room int auto_increment primary key,
    name varchar(100) not null,
    disponibility boolean default true,

    service_id int,
    constraint fk_service_room
        foreign key (service_id) references service (id_service) on delete cascade
);

-- Tabla de agendar cita
create table if not exists appointment (
    id_appointment int auto_increment primary key,
    appointment_date date not null,
    start_hour time,
    end_hour time,
    observations varchar(255),

    pet_id int,
    room_id int,
    veterinarian_dni varchar(9),
    constraint fk_pet_appointment
        foreign key (pet_id) references pet(id_pet) on delete cascade,
    constraint fk_room_appointment 
        foreign key (room_id) references room(id_room) on delete cascade,
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
    clean_date date not null,
    start_hour time,
    end_hour time,
    observations varchar(255),

    cleaner_dni varchar(9),
    appointment_id int,
    room_id int,
    constraint fk_cleaner_clean_service
        foreign key (cleaner_dni) references cleaner (dni_cleaner) on delete cascade,
    constraint fk_appointment_clean_service
        foreign key (appointment_id) references appointment (id_appointment) on delete cascade,
    constraint fk_room_clean_service
        foreign key (room_id) references room (id_room) on delete cascade
);