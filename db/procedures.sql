DELIMITER //

create or replace procedure register_week()
begin
    declare counter_new_rows int default 0;

    declare exit handler for sqlexception
    begin
        rollback;
        select 'Error en el proceso' as resultado;
    end;

    start transaction;

    insert into register (
        date_service,
        observation_appointment,
        observation_clean_service,
        pet_id,
        service_id,
        veterinarian_dni,
        cleaner_dni
    )
    select
        a.date_appointment,
        a.observations,
        c.observations,
        a.pet_id,
        a.service_id,
        a.veterinarian_dni,
        c.cleaner_dni
    from appointment a
    inner join clean_service c on a.id_appointment = c.appointment_id;

    set counter_new_rows = row_count();
    delete from appointment;
    commit;

    select concat('Se han insertado ', counter_new_rows, ' nuevos registros.') as resultado;
end //

DELIMITER ;