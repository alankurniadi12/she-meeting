import Finding from '../models/finding.model.js';

async function createFinding(payload) {
  const finding = await Finding.create(payload);
  return finding;
}

async function findById(id) {
  return await Finding.findById(id).populate('user', '-password');
}

async function findAll(filters = {}) {
  return await Finding.find(filters)
}

async function updateById(id, payload) {
  return await Finding.findByIdAndUpdate(id, payload, { new: true });
}

async function deleteById(id) {
  return await Finding.findByIdAndDelete(id);
}

export { createFinding, findById, findAll, updateById, deleteById };