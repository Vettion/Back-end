// Archivo en el que accedemos a la base de datos a por la información requerida y realizamos las operaciones de logica necesarias

const db = require ('../configuration/database.js').db;

const findAllPets = async () => {
    const pets = await db('pet')
        .join('owner', 'pet.owner_dni', 'owner.dni')
        .select('pet.*', 'owner.name as owner_name', 'owner.surname as owner_surname');
    
    const petsWithAllergies = await Promise.all(
        pets.map(async (pet) =>{
            const allergies = await db('have_allergy')
                .where('have_allergy.pet_id', pet.id)
                .join('allergy', 'have_allergy.allergy_id', 'allergy.id')
                .select('allergy.id', 'allergy.name', 'allergy.description');
            
            return {
                id: pet.id,
                name: pet.name,
                type: pet.type,
                race: pet.race,
                weight: pet.weight,
                sex:pet.sex,
                age: pet.age,
                owner_dni: pet.owner_dni,
                owner_name: pet.owner_name,
                owner_surname: pet.owner_surname,
                allergies: allergies
            };
        })
    );

    return petsWithAllergies;
};

const findPetById = async (id) => {
    const pet = await db('pet')
        .where('pet.id', id)
        .join('owner', 'pet.owner_dni', 'owner.dni')
        .select('pet.*', 'owner.name as owner_name', 'owner.surname as owner_surname')
        .first();
    
    if (!pet) return null;

    const allergies = await db('have_allergy')
        .where('have_allergy.pet_id', id)
        .join('allergy', 'have_allergy.allergy_id', 'allergy.id')
        .select('allergy.id', 'allergy.name', 'allergy.description');
    
    pet.allergies = allergies;

    return pet;
};

const addPet = async (petData) => {
    const { name, type, race, weight, sex, age, owner_dni} = petData;
    const [newId] = await db('pet').insert({
        name, 
        type, 
        race,
        weight,
        sex,
        age,
        owner_dni
    });

    return newId;
}

module.exports = {
    findAllPets,
    findPetById,
    addPet
}