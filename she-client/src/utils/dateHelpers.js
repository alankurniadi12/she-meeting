export function hitungUmur(tanggalLahir) {
  const today = new Date()
  const birth = new Date(tanggalLahir)

  let umur = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    umur--
  }

  return umur
}

export function hitungMasaKerja(tahunBergabung) {
  const tahunSekarang = new Date().getFullYear()
  const masa = tahunSekarang - tahunBergabung
  return `${masa} Tahun`
}

export function hitungTanggalPensiun(tanggalLahir, usiaPensiun = 53) {
  const t = new Date(tanggalLahir)
  t.setFullYear(t.getFullYear() + usiaPensiun)
  return t.toISOString().split("T")[0]
}
