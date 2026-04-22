create database if not exists vettion;
use vettion;

-- Tabla de dueños.
create table if not exists dueno (
    dni varchar(9) not null primary key,
    name varchar(100) not null,
    surname varchar(100) not null,
    phone varchar(15) not null,
    email varchar(100) not null
);

-- Tabla de alergias
create table if not exists alergia (
    id int auto_increment primary key,
    name varchar(100) not null,
    description varchar(255) not null
);

-- Tabla de veterinarios.
create table if not exists veterinario (
    dni varchar(9) not null primary key,
    name varchar(100) not null,
    surname varchar(100) not null,
    phone varchar(15) not null,
    address varchar(100) not null,
    num_SS varchar(100) not null,
    num_colegiado varchar(100) not null,
    email varchar(100) not null, 
    speciality varchar(100) not null
);

-- Tabla de empleados de la limpieza.
create table if not exists empleado_limpieza (
    dni varchar(9) not null primary key,
    name varchar(100) not null, 
    surname varchar(100) not null,
    phone varchar(15) not null,
    address varchar(100) not null,
    num_SS varchar(100) not null,
    email varchar(100) not null
);

-- Tabla de mascotas
create table if not exists mascota (
    id int auto_increment primary key,
    name varchar(100) not null,
    type varchar(100) not null,
    race varchar(100) not null,
    weight decimal(5,2) not null,
    sex varchar(20) not null,
    age int not null,

    dueno_dni varchar(9),
    constraint fk_dueno_mascota
        foreign key (dueno_dni) references dueno(dni) on delete cascade
);

-- Tabla intermedia de alergia y mascotas
create table if not exists tener_alergia (
    alergia_id int,
    mascota_id int,
    primary key (alergia_id, mascota_id),
    constraint fk_alergia_tener_alergia
        foreign key (alergia_id) references alergia (id) on delete cascade,
    constraint fk_mascota_tener_alergia
        foreign key (mascota_id) references mascota (id) on delete cascade
);

-- Tabla de salas
create table if not exists sala (
    id int auto_increment primary key,
    type varchar(100) not null,
    name varchar(100) not null,
    disponibility boolean not null default true
);

-- Tabla intermedia de salas y empleados de limpieza
create table if not exists programacion_limpieza (
    id_programacion int auto_increment primary key,
    limpiador_dni varchar(9),
    sala_id int,
    fecha_limpieza datetime not null,
    constraint fk_limpiador_sala
        foreign key (limpiador_dni) references empleado_limpieza (dni) on delete cascade,
    constraint fk_sala_limpieza
        foreign key (sala_id) references sala (id) on delete cascade
);

-- Tabla de programar la cita
create table if not exists programar_cita (
    id_cita int auto_increment primary key,
    mascota_id int,
    sala_id int,
    veterinario_dni varchar(9),
    fecha_hora datetime not null,
    precio decimal(10,2) not null,
    motivo varchar(255),
    constraint fk_cita_mascota
        foreign key (mascota_id) references mascota(id),
    constraint fk_cita_sala 
        foreign key (sala_id) references sala(id),
    constraint fk_cita_veterinario
        foreign key (veterinario_dni) references veterinario(dni)
);