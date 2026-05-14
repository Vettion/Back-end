// Archivo en el que accedemos a la base de datos a por la informacion requerida y realizamos las operaciones de logica necesaria.
const db = require("../configuration/database.js").db;
const { formatDate } = require('../utils/dateUtil.js');

/**
 * Funcion para obtener todas las alergias de la base de datos.
 * @returns {Promise<Array>} Devuelve una promesa que resuelve en un array de objetos (alergias).
 */
const findAllPathologies = async () => {
  const pathologies = await db("pathology").select("*");
  const pathologyFormat = pathologies.map(p => ({ ...p, detection_date: formatDate(p.detection_date) }));
  return pathologyFormat;
};

/**
 * Funcion para obtener una alergia por su id.
 * @param {number} id_allergy - El id de la alergia a buscar.
 * @returns {Promise<Object|null>} Devuelve una promesa que resuelve en un objeto (alergia) o null si no se encuentra.
 */
const findPathologyById = async (id_pathology) => {
  const pathology = await db("pathology").where({ id_pathology: id_pathology }).first();
  return { ...pathology, detection_date: formatDate(pathology.detection_date) };
};

const findPathologyByPetId = async (pet_id) => {
  const pathologies = await db("pathology")
    .join("have_pathology", "pathology.id_pathology", "=", "have_pathology.pathology_id")
    .where("have_pathology.pet_id", pet_id)
    .select("pathology.*");

  const pathologyFormat = pathologies.map(p => ({ ...p, detection_date: formatDate(p.detection_date) }));
  return pathologyFormat;
};

/**
 * Funcion para agregar una nueva alergia.
 * @param {string} name - El nombre de la alergia.
 * @param {string} description - La descripcion de la alergia.
 * @returns {Promise<number>} Devuelve una promesa que resuelve en el id de la alergia agregada.
 */
const addPathology = async (pathologyData) => {
  const {
    name,
    type,
    diagnostic_method,
    symptoms,
    severity_level,
    treatment,
    is_chronic,
    detection_date,
    id_pet
  } = pathologyData;

  return await db.transaction(async (asignPathology) => {
    const [pathologyId] = await asignPathology("pathology").insert({
      name,
      type,
      diagnostic_method,
      symptoms,
      severity_level,
      treatment,
      is_chronic,
      detection_date
    });

    await asignPathology("have_pathology").insert({
      pathology_id: pathologyId,
      pet_id: id_pet
    });

    console.log(`Vinculando Alergia ID: ${pathologyId} con Mascota ID: ${id_pet}`);

    return pathologyId;
  });
};

/**
 * Función para actualizar una alergia existente.
 * @param {number} id_allergy - El id de la alergia a actualizar.
 * @param {Object} allergyData - Los datos de la alergia a actualizar.
 * @returns {Promise<void>} Devuelve una promesa que se resuelve cuando la alergia es actualizada.
 */
const updatePathology = async (id_pathology, pathologyData) => {
  const {
    name,
    type,
    diagnostic_method,
    symptoms,
    severity_level,
    treatment,
    is_chronic,
    detection_date
  } = pathologyData;

  await db("pathology").where({ id_pathology: id_pathology }).update({
    name,
    type,
    diagnostic_method,
    symptoms,
    severity_level,
    treatment,
    is_chronic,
    detection_date
  });
};

/**
 * Función para eliminar una alergia.
 * @param {number} id_allergy - El id de la alergia a eliminar.
 * @returns {Promise<void>} Devuelve una promesa que se resuelve cuando la alergia es eliminada.
 */
const removePathology = async (id_pathology) => {
  return await db("pathology").where({ id_pathology: id_pathology }).del();
};

module.exports = {
  findAllPathologies,
  findPathologyById,
  findPathologyByPetId,
  addPathology,
  updatePathology,
  removePathology
};
