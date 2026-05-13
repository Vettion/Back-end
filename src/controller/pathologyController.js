// Este archivo implementa las operaciones que se han definido en el /service/allergyService.js
const {
  findAllPathologies, findPathologyById, findPathologyByPetId, addPathology, updatePathology, removePathology
} = require("../service/pathologyService.js");

/**
 * Función para obtener el listado de todas las patologías.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 200 y un array de alergias.
 */
const getAllPathologies = async (req, res, next) => {
  try {
    const pathologies = await findAllPathologies();
    res.status(200).json({
      code: 200,
      title: "success",
      message: "Pathologies retrieved successfully",
      data: pathologies,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Función para obtener una patologia por su id.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 200 y un objeto (alergia) o un error 404 si no se encuentra.
 */
const getPathologyById = async (req, res, next) => {
  try {
    const { id_pathology } = req.params;
    const pathology = await findPathologyById(id_pathology);

    if (!pathology) {
      return res.status(404).json({
        code: 404,
        title: "not found",
        message: `Pathology with id ${id_pathology} not found.`,
      });
    }

    res.status(200).json({
      code: 200,
      title: "success",
      message: `Pathology with id ${id_pathology} retrieved successfully.`,
      data: pathology,
    });
  } catch (error) {
    next(error);
  }
};

const getPathologyByPetId = async (req, res, next) => {
  try {
    const { pet_id } = req.params;
    const pathology = await findPathologyByPetId(pet_id);

    if (!pathology || pathology.length === 0) {
      return res.status(404).json({
        code: 404,
        title: "not found",
        message: `Pathology with pet_id ${pet_id} not found.`,
      });
    }

    res.status(200).json({
      code: 200,
      title: "success",
      message: `Pathology with pet_id ${pet_id} retrieved successfully.`,
      data: pathology,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Función para crear una nueva alergia.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 201 y el objeto (alergia) creado.
 */
const postPathology = async (req, res, next) => {
  try {
    const newId = await addPathology(req.body);
    const newPathology = await findPathologyById(newId);

    res.status(201).json({
      code: 201,
      title: "created",
      message: "Pathology created successfully",
      data: newPathology,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Función para actualizar una alergia existente.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 204 y un mensaje de éxito o un error 404 si no se encuentra.
 */
const putPathology = async (req, res, next) => {
  try {
    const { id_pathology } = req.params;
    const {
      name,
      type,
      diagnostic_method,
      symptoms,
      severity_level,
      treatment,
      is_chronic,
      detection_date
    } = req.body;

    const pathology = await findPathologyById(id_pathology);

    if (!pathology) {
      return res.status(404).json({
        code: 404,
        title: "not found",
        message: `Pathology with id ${id_pathology} not found.`,
      });
    }

    await updatePathology(id_pathology, {
      name,
      type,
      diagnostic_method,
      symptoms,
      severity_level,
      treatment,
      is_chronic,
      detection_date
    });
    res.status(200).json({
      code: 200,
      title: "success",
      message: `Pathology with id ${id_pathology} updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Función para eliminar una alergia.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función para pasar el control al siguiente middleware en caso de error.
 * @returns Devuelve un JSON con código 200 y un mensaje de éxito o un error 404 si no se encuentra.
 */
const deletePathology = async (req, res, next) => {
  try {
    const { id_pathology } = req.params;
    const pathology = await findPathologyById(id_pathology);

    if (!pathology) {
      return res.status(404).json({
        code: 404,
        title: "not found",
        message: `Pathology with id ${id_pathology} not found.`,
      });
    }

    await removePathology(id_pathology);
    res.status(200).json({
      code: 200,
      title: "success",
      message: `Pathology with id ${id_pathology} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPathologies,
  getPathologyById,
  getPathologyByPetId,
  postPathology,
  putPathology,
  deletePathology,
};
