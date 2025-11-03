export interface RiskCalculationInput {
  statutHPV?: string
  age?: number
  symptomes?: string[]
  antecedents?: string
  typeHPV?: string
  vaccination?: string
  tabagisme?: string
  immunodeficience?: string
  nombreGrossesses?: number
}

export interface RiskResult {
  score: number
  level: "Faible" | "Modéré" | "Élevé"
  color: "success" | "warning" | "danger"
}

export function calculateRiskScore(data: RiskCalculationInput): RiskResult {
  let score = 0

  // HPV status (40 points max)
  const statutHPV = data.statutHPV?.toLowerCase()
  if (statutHPV === "positif") score += 40
  else if (statutHPV === "négatif") score += 0
  else score += 20

  // HPV type (additional 15 points for high-risk types)
  if (data.typeHPV === "HPV-16" || data.typeHPV === "HPV-18") {
    score += 15
  }

  // Age factor (20 points max)
  const age = data.age || 30
  if (age > 50) score += 20
  else if (age > 40) score += 15
  else if (age > 30) score += 10
  else score += 5

  // Symptoms (35 points max)
  const symptomes = data.symptomes || []
  if (symptomes.some((s) => s.toLowerCase().includes("saignement"))) score += 15
  if (symptomes.some((s) => s.toLowerCase().includes("douleur"))) score += 10
  if (symptomes.some((s) => s.toLowerCase().includes("perte"))) score += 10

  // Medical history (20 points max)
  const antecedents = data.antecedents?.toLowerCase() || ""
  if (antecedents.includes("cancer")) score += 20
  else if (antecedents.includes("ist")) score += 15

  // Vaccination (-10 points if vaccinated)
  if (data.vaccination === "Oui") score -= 10

  // Smoking (10 points)
  if (data.tabagisme === "Oui") score += 10

  // Immunodeficiency (15 points)
  if (data.immunodeficience === "Oui") score += 15

  // Number of pregnancies (5 points if > 3)
  if (data.nombreGrossesses && data.nombreGrossesses > 3) score += 5

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(score, 100))

  // Determine risk level
  let level: "Faible" | "Modéré" | "Élevé"
  let color: "success" | "warning" | "danger"

  if (score < 30) {
    level = "Faible"
    color = "success"
  } else if (score < 60) {
    level = "Modéré"
    color = "warning"
  } else {
    level = "Élevé"
    color = "danger"
  }

  return { score, level, color }
}
