drop database if exists vettion;
create database vettion;
use vettion;

-- Tabla de dueños.
create table if not exists owner (
    dni_owner varchar(9) primary key,
    name_owner varchar(100) not null,
    surname varchar(100) not null,
    birth_date date not null,
    phone varchar(15) not null,
    email varchar(100),
    direction varchar(255) not null,
    floor varchar(10),
    city varchar(100) not null,
    province varchar(100) not null,
    postal_code varchar(10) not null
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
    age int (3),
    register_date date not null,

    owner_dni varchar(9),
    constraint fk_owner_pet 
        foreign key (owner_dni) references owner(dni_owner) on delete cascade
);

-- Tabla de alergias
create table if not exists pathology (
    id_pathology int auto_increment primary key,
    name varchar(100) not null,
    type varchar(100) not null,
    diagnostic_method varchar(150),
    symptoms text,
    severity_level varchar(20) not null,
    treatment text not null,
    is_chronic boolean default false,
    detection_date date not null
);

-- Tabla intermedia de alergias de las mascotas
create table if not exists have_pathology (
    id_have_pathology int auto_increment primary key,

    pathology_id int,
    pet_id int,
    constraint fk_allergy_have_pathology
        foreign key (pathology_id) references pathology (id_pathology) on delete cascade,
    constraint fk_pet_have_pathology
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
    speciality varchar(100) not null
);

-- Tabla de servicios.
create table if not exists service (
    id_service int auto_increment primary key,
    name varchar(100) not null,
    service_type varchar(100) not null,
    duration int not null,
    base_price double(10, 2) not null,
    description text
);

-- Tabla de Salas
create table if not exists room (
    room_code int auto_increment primary key,
    name varchar(100) not null,
    type varchar(50) not null,
    is_free boolean not null,
    location varchar(50) not null
);

-- Tabla de citas.
create table if not exists appointment (
    id_appointment int auto_increment primary key,
    date_appointment date not null,
    start_time time not null,
    end_time time,
    observations varchar(255),
    
    pet_id int,
    service_id int,
    veterinarian_dni varchar(9),
    code_room int,
    constraint fk_pet_appointment 
        foreign key (pet_id) references pet(id_pet) on delete cascade,
    constraint fk_service_appointment 
        foreign key (service_id) references service(id_service) on delete cascade,
    constraint fk_veterinarian_appointment 
        foreign key (veterinarian_dni) references veterinarian(dni_veterinarian) on delete cascade,
    constraint fk_room_appointment
        foreign key (code_room) references room(room_code) on delete cascade
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