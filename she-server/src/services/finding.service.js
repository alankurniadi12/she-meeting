import AppError from '../utils/AppError.js';
import * as findingRepository from '../repositories/finding.repository.js';
import * as userRepository from '../repositories/user.repository.js';

async function createFindingService({ description, reportedAt, division, targetDivision, lokasi, catatan, images, userId }) {
  if (!description || !reportedAt || !division || !targetDivision || !lokasi) {
    throw new AppError('Field yang diperlukan: description, reportedAt, division, targetDivision, lokasi', 400);
  }

  const newFinding = await findingRepository.createFinding({
    description,
    reportedAt,
    division,
    targetDivision,
    lokasi,
    catatan,
    images,
    user: userId,
    logs: [
      {
        action: 'Finding created',
        status: 'in_progress',
        by: userId,
      },
    ],
  });

  // increment the user's countFindings atomically
  if (userId) {
    await userRepository.incrementFindingsCount(userId, 1);
    await userRepository.updateLatestContribution(userId, reportedAt || new Date());
  }

  return {
    code: 201,
    status: 'SUCCESS',
    message: 'Finding berhasil dibuat',
    data: newFinding,
  };
}

async function getAllFindingsService(filters = {}, options = {}) {
  const result = await findingRepository.findAllPaged(filters, options);
  if (!result) throw new AppError('Gagal mengambil daftar temuan', 500);
  return {
    code: 200,
    status: 'SUCCESS',
    message: 'Daftar findings',
    data: result.docs,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    },
  };
}

async function getFindingByIdService(id) {
    console.log("Service Fetching finding with ID:", id);
  const finding = await findingRepository.findById(id);
  if (!finding) throw new AppError('Data tidak ditemukan', 404);
  return {
    code: 200,
    status: 'SUCCESS',
    message: 'Detail finding',
    data: finding,
  };
}

async function updateFindingService(id, payload, userId) {
  const existing = await findingRepository.findById(id);
  if (!existing) throw new AppError('Data tidak ditemukan', 404);

  const logs = existing.logs || [];
  logs.push({
    action: 'Status updated',
    changestatus: payload.status ? `Status changed from ${existing.status} to ${payload.status}` : 'No status change',
    by: userId,
    at: new Date(),
  });

  const updated = await findingRepository.updateById(id, { ...payload, logs });
  return {
    code: 200,
    status: 'SUCCESS',
    message: 'Temuan berhasil diperbarui',
    data: updated,
  };
}

async function deleteFindingService(id) {
  const existing = await findingRepository.findById(id);
  if (!existing) throw new AppError('Data tidak ditemukan', 404);

  await findingRepository.deleteById(id);
  return {
    code: 200,
    status: 'SUCCESS',
    message: 'Temuan berhasil dihapus',
    data: null,
  };
}

export { 
    createFindingService,
    getAllFindingsService,
    getFindingByIdService,
    updateFindingService,
    deleteFindingService,
 };