// Mock Patient Records for NIDAN Diagnocare
// Initial demo records to display in the Patient Records list and Dashboard

export const mockPatients = [
  {
    id: "pat-001",
    token: "ND-204",
    fullName: "Aarav Sharma",
    gender: "Male",
    age: 45,
    weight: 78,
    mobileNumber: "9876543210",
    address: "Flat 402, Sunshine Heights, Sector 15, Vashi, Navi Mumbai",
    doctorName: "Dr. Sandeep Patwardhan",
    sampleType: "Blood",
    testType: "Complete Blood Count (CBC) & Lipid Profile (Cholesterol)",
    tests: [
      { name: "Complete Blood Count (CBC)", price: 350 },
      { name: "Lipid Profile (Cholesterol)", price: 650 }
    ],
    totalBill: 1000,
    dateOfVisit: "2026-06-01",
    status: "Completed",
    notes: "Patient requested reports via WhatsApp. Fasting state maintained."
  },
  {
    id: "pat-002",
    token: "ND-205",
    fullName: "Priya Patel",
    gender: "Female",
    age: 32,
    weight: 58,
    mobileNumber: "9123456780",
    address: "B-12, Gokul Dham Society, Film City Road, Goregaon East, Mumbai",
    doctorName: "Dr. Anita Mehta",
    sampleType: "Urine",
    testType: "Routine Urine Analysis",
    tests: [
      { name: "Routine Urine Analysis", price: 250 }
    ],
    totalBill: 250,
    dateOfVisit: "2026-06-01",
    status: "In Progress",
    notes: "Report pending microbial culture growth inspection (24 hrs)."
  },
  {
    id: "pat-003",
    token: "ND-206",
    fullName: "Rohan Deshmukh",
    gender: "Male",
    age: 58,
    weight: 85,
    mobileNumber: "8888877777",
    address: "Row House No. 4, Greenfield Residency, Baner, Pune",
    doctorName: "Dr. Vikram Ranade",
    sampleType: "Blood",
    testType: "HbA1c & Fasting Glucose",
    tests: [
      { name: "HbA1c & Fasting Glucose", price: 550 }
    ],
    totalBill: 550,
    dateOfVisit: "2026-06-01",
    status: "Pending",
    notes: "Diabetic follow-up. Sample collected at 8:00 AM."
  },
  {
    id: "pat-004",
    token: "ND-207",
    fullName: "Meera Nair",
    gender: "Female",
    age: 27,
    weight: 52,
    mobileNumber: "7776665554",
    address: "Apt 105, Lotus Orchid, Outer Ring Road, Marathahalli, Bangalore",
    doctorName: "Dr. Ritu Karidhal",
    sampleType: "Blood",
    testType: "Thyroid Profile (T3, T4, TSH)",
    tests: [
      { name: "Thyroid Profile (T3, T4, TSH)", price: 800 }
    ],
    totalBill: 800,
    dateOfVisit: "2026-05-31",
    status: "Completed",
    notes: "History of hypothyroidism. Annual checkup."
  },
  {
    id: "pat-005",
    token: "ND-208",
    fullName: "Amit Verma",
    gender: "Male",
    age: 39,
    weight: 72,
    mobileNumber: "9998887776",
    address: "C-42, Shanti Kunj, Vasant Kunj, New Delhi",
    doctorName: "Dr. K. K. Aggarwal",
    sampleType: "Other",
    testType: "Routine Urine Analysis",
    tests: [
      { name: "Routine Urine Analysis", price: 250 }
    ],
    totalBill: 250,
    dateOfVisit: "2026-05-31",
    status: "Completed",
    notes: "Persistent dry cough for 3 weeks. Referred for TB screening."
  },
  {
    id: "pat-006",
    token: "ND-209",
    fullName: "Sneha Kulkarni",
    gender: "Female",
    age: 65,
    weight: 64,
    mobileNumber: "9422001122",
    address: "Block A, Shanti Niketan, Prabhat Road, Lane 5, Pune",
    doctorName: "Dr. Anita Mehta",
    sampleType: "Blood",
    testType: "Liver Function Test (LFT) & Kidney Function Test (KFT)",
    tests: [
      { name: "Liver Function Test (LFT)", price: 750 },
      { name: "Kidney Function Test (KFT)", price: 700 }
    ],
    totalBill: 1450,
    dateOfVisit: "2026-06-01",
    status: "In Progress",
    notes: "Routine health monitoring for senior citizen."
  }
];

export const getDashboardStats = (patientsList) => {
  const today = "2026-06-01"; // Hardcoded to match our demo date context
  
  const totalToday = patientsList.filter(p => p.dateOfVisit === today).length;
  const pending = patientsList.filter(p => p.status === "Pending").length;
  const samplesCollected = patientsList.filter(p => p.status === "In Progress" || p.status === "Completed").length;
  const completed = patientsList.filter(p => p.status === "Completed").length;

  return {
    totalToday,
    pending,
    samplesCollected,
    completed
  };
};
