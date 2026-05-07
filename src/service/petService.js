// Archivo en el que accedemos a la base de datos a por la información requerida y realizamos las operaciones de logica necesarias

const db = require('../configuration/database.js').db;

/**
 * Metodo para obtener todas las mascotas de la base de datos.
 * @returns {Promise <Array>} - Devuelve una promesa que resulve en un array de objetos (mascotas).
 */
const findAllPets = async () => {
    const pets = await db('pet')
        .join('owner', 'pet.owner_dni', 'owner.dni_owner')
        .select('pet.*', 'owner.name as owner_name', 'owner.surname as owner_surname');

    const petsWithAllergies = await Promise.all(
        pets.map(async (pet) => {
            const allergies = await db('have_allergy')
                .where('have_allergy.pet_id', pet.id_pet)
                .join('allergy', 'have_allergy.allergy_id', 'allergy.id_allergy')
                .select('allergy.id_allergy', 'allergy.name', 'allergy.description');

            return {
                id: pet.id_pet,
                name: pet.name,
                type: pet.type,
                breed: pet.breed,
                weight: pet.weight,
                sex: pet.sex,
                birth_date: pet.birth_date,
                owner_dni: pet.owner_dni,
                owner_name: pet.owner_name,
                owner_surname: pet.owner_surname,
                allergies: allergies
            };
        })
    );

    return petsWithAllergies;
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
        .select('pet.*', 'owner.name as owner_name', 'owner.surname as owner_surname')
        .first();

    if (!pet) return null;

    const allergies = await db('have_allergy')
        .where('have_allergy.pet_id', pet.id_pet)
        .join('allergy', 'have_allergy.allergy_id', 'allergy.id_allergy')
        .select('allergy.id_allergy', 'allergy.name', 'allergy.description');

    pet.allergies = allergies;

    return pet;
};

/**
 * Añade una nueva mascota a la base de datos, y si se proporcionan alergias, tambien añade las relaciones correspondientes en la tabla intermedia.
 * @param {Object} petData - Objeto que contiene datos de la mascota y el array de 'allergies'.
 * @returns {Promise<number>} - Devuelve el Id de la nueva mascota insertada.
 */
const addPet = async (petData) => {
    const { name, type, breed, weight, sex, birth_date, owner_dni, allergies } = petData;

    const existingPet = await db('pet').where({ name: name, type: type, breed: breed, birth_date: birth_date, owner_dni: owner_dni }).first();

    if (existingPet) {
        throw new Error(`Pet with name ${name}, type ${type}, breed ${breed}, birth date ${birth_date}, and owner DNI ${owner_dni} already registered.`);
    }
    const [newId] = await db('pet').insert({
        name,
        type,
        breed,
        weight,
        sex,
        birth_date,
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
    await db('pet')
        .where({ id_pet: id })
        .update({
            name_pet,
            type,
            breed,
            weight,
            sex,
            birth_date,
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