-- Procedimiento para almacenar la informacion de las tablas appointment y clean_service en la tabla register
create or replace procedure register_week 
as
    counter_new_rows number := 0;
begin
    -- Con un bucle for vamos a almacenar las citas en nuevos registros de la tabla registros
    for register in (
        select 
            a.date_appointment, a.pet_id, a.service_id, a.veterinarian_dni, c.cleaner_dni, 
            a.observations as obs_app, c.observations as obs_clean
        from appointment a
        inner join clean_service c on a.id_appointment = c.id_appointment
    ) loop
        -- insertamos en register los datos obtenidos del select anterior
        insert into register (
            date_service,
            observation_appointment,
            observation_clean_service,
            pet_id,
            service_id,
            veterinarian_dni,
            cleaner_dni
        ) values (
            register.date_appointment,
            register.obs_app,
            register.obs_clean,
            register.pet_id,
            register.service_id,
            register.veterinarian_dni,
            register.cleaner_dni
        );

        counter_new_rows:= counter_new_rows + 1;
    end loop;
    dbms_output.put_line('Se han insertado ' || counter_new_rows || ' nuevos registros.');
    delete from appointment;
    commit;

exception
    when others then
        rollback;
        dbms_output.put_line('Error en el proceso: ' || sqlerrm);
end;
/