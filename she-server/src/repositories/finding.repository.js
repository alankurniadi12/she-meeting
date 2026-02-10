import Finding from '../models/finding.model.js';

async function createFinding(payload) {
  const finding = await Finding.create(payload);
  return finding;
}

async function findById(id) {
  return await Finding.findById(id).populate('user', '-password');
}

async function findAll(filters = {}) {
  // keep non-paginated behavior for callers that expect an array
  return await Finding.find(filters)
}

async function findAllPaged(filters = {}, options = {}) {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Number(options.limit) || 20);
  const sort = options.sort || { createdAt: -1 };
  const skip = (page - 1) * limit;

  const [docs, total] = await Promise.all([
    Finding.find(filters).sort(sort).skip(skip).limit(limit).lean(),
    Finding.countDocuments(filters),
  ]);

  return {
    docs,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

async function findByUserId(userId) {
  return await Finding.find({ user: userId }).select('_id').lean();
}

async function updateById(id, payload) {
  return await Finding.findByIdAndUpdate(id, payload, { new: true });
}

async function deleteById(id) {
  return await Finding.findByIdAndDelete(id);
}

export { createFinding, findById, findAll, findAllPaged, findByUserId, updateById, deleteById };