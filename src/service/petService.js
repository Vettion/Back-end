// Archivo en el que accedemos a la base de datos a por la información requerida y realizamos las operaciones de logica necesarias

const db = require('../configuration/database.js').db;
const { register } = require('node:module');
const { formatDate, getYearsFromNow, isAtLeastAge } = require('../utils/dateUtil.js');
const path = require('node:path');
const { findOwnerByDni } = require('./ownerService.js');

/**
 * Metodo para obtener todas las mascotas de la base de datos.
 * @returns {Promise <Array>} - Devuelve una promesa que resulve en un array de objetos (mascotas).
 */
const findAllPets = async () => {
    const pets = await db('pet')
        .join('owner', 'pet.owner_dni', 'owner.dni_owner')
        .select('pet.*', 'owner.name_owner as owner_name', 'owner.surname as owner_surname');

    //Comprobamos que si el dia y mes de la fecha de nacimiento son iguales a los de la fecha actual recalculamos la edad.
    const date = new Date();
    const dayDate = date.getDay();
    const monthDate = date.getMonth();

    const birthDate = new Date(pets.birth_date);
    const dayBirth = birthDate.getDay();
    const monthBirth = birthDate.getMonth();

    let newPets;

    if (dayDate === dayBirth && monthDate === monthBirth) {
        const newAge = getYearsFromNow(birthDate);
        newPets = pets.map(p => ({ ...p, birth_date: formatDate(p.birth_date), age: newAge, register_date: formatDate(p.register_date) }));
    }
    else {
        newPets = pets.map(p => ({ ...p, birth_date: formatDate(p.birth_date), register_date: formatDate(p.register_date) }));
    }

    const petsWithPathologies = await Promise.all(
        newPets.map(async (pet) => {
            const pathologies = await db('have_pathology')
                .where('have_pathology.pet_id', pet.id_pet)
                .join('pathology', 'have_pathology.pathology_id', 'pathology.id_pathology')
                .select("*");

            return {
                id: pet.id_pet,
                name_pet: pet.name_pet,
                type: pet.type,
                breed: pet.breed,
                weight: pet.weight,
                sex: pet.sex,
                birth_date: pet.birth_date,
                age: pet.age,
                register_date: pet.register_date,
                owner_dni: pet.owner_dni,
                owner_name: pet.owner_name,
                owner_surname: pet.owner_surname,
                pathologies: pathologies
            };
        })
    );

    return petsWithPathologies;
};

/**
 * Metodo para obtener una mascota por su id.
 * @param {number} id - El id de la mascota a buscar.
 * @returns {Promise<Object|null>} Devuelve una promesa que resuelve en un objeto (mascota) o null si no se encuentra la mascota.
 */
const findPetById = async (id) => {
    const pet = await db('pet')
        .where('pet.id_pet', id)
        .join('owner', 'pet.owner_dni', 'owner.dni_owner')
        .select('pet.*', 'owner.name_owner as owner_name', 'owner.surname as owner_surname')
        .first();

    if (!pet) return null;

    const pathologies = await db('have_pathology')
                .where('have_pathology.pet_id', pet.id_pet)
                .join('pathology', 'have_pathology.pathology_id', 'pathology.id_pathology')
                .select("*");

    pet.pathologies = pathologies;

    //Comprobamos que si el dia y mes de la fecha de nacimiento son iguales a los de la fecha actual recalculamos la edad.
    const date = new Date();
    const dayDate = date.getDay();
    const monthDate = date.getMonth();

    const birthDate = new Date(pet.birth_date);
    const dayBirth = birthDate.getDay();
    const monthBirth = birthDate.getMonth();

    let newPet;

    if (dayDate === dayBirth && monthDate === monthBirth) {
        const newAge = getYearsFromNow(birthDate);
        return { ...pet, birth_date: formatDate(pet.birth_date), age: newAge, register_date: formatDate(pet.register_date) }
    }
    else {
        return { ...pet, birth_date: formatDate(pet.birth_date), register_date: formatDate(pet.register_date) }
    }
};

/**
 * Añade una nueva mascota a la base de datos, y si se proporcionan alergias, tambien añade las relaciones correspondientes en la tabla intermedia.
 * @param {Object} petData - Objeto que contiene datos de la mascota y el array de 'allergies'.
 * @returns {Promise<number>} - Devuelve el Id de la nueva mascota insertada.
 */
const addPet = async (petData) => {
    const { name_pet, type, breed, weight, sex, birth_date, owner_dni, allergies } = petData;

    const owner = await findOwnerByDni(owner_dni);

    if (!owner) {
        const error = new Error(`Owner with DNI ${owner_dni} not found.`);
        error.status = 404;
        throw error;
    }

    if (!isAtLeastAge(owner.birth_date, 18)) {
        const error = new Error(`Owner with DNI ${owner_dni} must be at least 18 years old to register a pet.`);
        error.status = 403;
        throw error;
    }

    const existingPet = await db('pet').where({ name_pet: name_pet, type: type, breed: breed, birth_date: birth_date, owner_dni: owner_dni }).first();

    if (existingPet) {
        throw new Error(`Pet with name ${name_pet}, type ${type}, breed ${breed}, birth date ${birth_date}, and owner DNI ${owner_dni} already registered.`);
    }

    const birthDate = new Date(birth_date);
    const date = new Date();
    if(birthDate.getTime() > date.getTime()){
        throw new Error('La fecha de nacimiento no puede ser mayor que la actual');
    }

    const petAge = getYearsFromNow(birth_date);
    const [newId] = await db('pet').insert({
        name_pet,
        type,
        breed,
        weight,
        sex,
        birth_date,
        age: petAge,
        register_date: new Date(),
        owner_dni
    });

    if (allergies && allergies.length > 0) {
        const allergyInserts = allergies.map(allergyId => ({
            pet_id: newId,
            allergy_id: allergyId
        }));
        await db('have_allergy').insert(allergyInserts);

    }

    return newId;
}

/**
 * Actualiza la informacion de una mascota existente.
 * Actualiza los datos basicos y si se proporcion una lista de alergias reemplaza las relaciones existentes por las nuevas.
 * @param {number} id - El id de la mascota a actualizar. 
 * @param {*} petData - Objeto con los datos de la mascota a actualizar (puede incluir 'allergies').
 * @returns {Promise<void>} - No devuelve ningun valor. Ejecuta la operacion en la base de datos.
 */
const updatePet = async (id, petData) => {
    const { name_pet, type, breed, weight, sex, birth_date, owner_dni, allergies } = petData;
    const owner = await findOwnerByDni(owner_dni);

    if (!owner) {
        const error = new Error(`Owner with DNI ${owner_dni} not found.`);
        error.status = 404;
        throw error;
    }

    if (!isAtLeastAge(owner.birth_date, 18)) {
        const error = new Error(`Owner with DNI ${owner_dni} must be at least 18 years old to register a pet.`);
        error.status = 403;
        throw error;
    }

    const petAge = getYearsFromNow(birth_date);
    await db('pet')
        .where({ id_pet: id })
        .update({
            name_pet,
            type,
            breed,
            weight,
            sex,
            birth_date,
            age: petAge,
            owner_dni
        });

    if (allergies) {
        await db('have_allergy').where('pet_id', id).del();

        if (allergies.length > 0) {
            const allergyInserts = allergies.map(allergyId => ({
                pet_id: id,
                allergy_id: allergyId
            }));
            await db('have_allergy').insert(allergyInserts);
        }
    }
};

/**
 * Elimina una mascota por su Id.
 * @param {number} id - El id de la mascota a eliminar 
 * @returns {Promise<number>} - Devuelve 1 si se borro el registro, 0 si no existia.
 */
const removePet = async (id) => {
    return await db('pet').where({ id_pet: id }).del();
}

module.exports = {
    findAllPets,
    findPetById,
    addPet,
    updatePet,
    removePet
}