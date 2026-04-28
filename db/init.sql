create database if not exists vettion;
use vettion;

-- Tabla de dueños.
create table if not exists owner (
    dni varchar(9) primary key,
    name varchar(100) not null,
    surname varchar(100) not null,
    phone varchar(15) not null,
    email varchar(100)
);

-- Tabla de alergias
create table if not exists allergy (
    id int auto_increment primary key,
    name varchar(100) not null,
    description varchar(255) not null
);

-- Tabla de veterinarios.
create table if not exists veterinarian (
    dni varchar(9) primary key,
    name varchar(100) not null,
    surname varchar(100) not null,
    phone varchar(15) not null,
    address varchar(100) not null,
    SS_number varchar(100) not null,
    num_collegiate varchar(100) not null,
    email varchar(100) not null, 
    speciality varchar(100)
);

-- Tabla de empleados de la limpieza.
create table if not exists cleaner (
    dni varchar(9) primary key,
    name varchar(100) not null, 
    surname varchar(100) not null,
    phone varchar(15) not null,
    address varchar(100) not null,
    SS_number varchar(100) not null,
    email varchar(100) not null
);

-- Tabla de mascotas
create table if not exists pet (
    id int auto_increment primary key,
    name varchar(100) not null,
    type varchar(100) not null,
    race varchar(100) not null,
    weight decimal(5,2) not null,
    sex varchar(20) not null,
    age int not null,

    owner_dni varchar(9),
    constraint fk_owner_pet
        foreign key (owner_dni) references owner(dni) on delete cascade
);

-- Tabla intermedia de alergia y mascotas
create table if not exists have_allergy (
    new_allergy_pet int auto_increment primary key,
    description text,

    allergy_id int,
    pet_id int,
    constraint fk_allergy_have_allergy
        foreign key (allergy_id) references allergy (id) on delete cascade,
    constraint fk_pet_have_allergy
        foreign key (pet_id) references pet (id) on delete cascade
);

-- Tabla de salas
create table if not exists consult (
    id_consult int auto_increment primary key,
    type varchar(100) not null,
    name varchar(100) not null,
    duration int,
    price double(10, 2),
    description text
);

-- Tabla de programar servicio de limpieza
create table if not exists clean_service (
    id_clean_service int auto_increment primary key,
    day date not null,
    hour_start time,

    cleaner_dni varchar(9),
    room_id int,
    constraint fk_cleaner_clean_service
        foreign key (cleaner_dni) references cleaner (dni) on delete cascade,
    constraint fk_room_clean_service
        foreign key (room_id) references room (id) on delete cascade
);

-- Tabla de programar cita para la mascota
create table if not exists appointment (
    id_appointment int auto_increment primary key,
    appointment_date date not null,
    start_hour time,
    duration int,
    reason varchar(255),

    pet_id int,
    room_id int,
    veterinarian_dni varchar(9),
    constraint fk_pet_appointment
        foreign key (pet_id) references pet(id) on delete cascade,
    constraint fk_room_appointment 
        foreign key (room_id) references room(id) on delete cascade,
    constraint fk_veterinarian_appointment
        foreign key (veterinarian_dni) references veterinarian(dni) on delete cascade
);