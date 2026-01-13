import Finding  from "../models/finding.model.js";

export const createFinding = async (req, res) => {
  try {
    const {
      description,
      reportedAt,
      division,
      targetDivision,
      lokasi,
      catatan,
      images,
    } = req.body;

    if (!description || !reportedAt || !division || !targetDivision || !lokasi) {
      return res.status(400).json({
        message: "Data wajib belum lengkap",
      });
    }

    const finding = await Finding.create({
      description,
      reportedAt,
      division,
      targetDivision,
      lokasi,
      catatan,
      images,
      user: req.user._id,
      logs: [
        {
          action: "Finding created",
          status: "in_progress",
          by: req.user._id,
        },
      ],
    });

    res.status(201).json(finding);
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat finding",
      error: error.message,
    });
  }
};
