export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type DocStatus = 'approved' | 'rejected' | 'pending';

export interface ValidationField {
  field: string;
  declared: string;
  ocr: string;
  status: 'match' | 'mismatch' | 'warning';
}

export interface Issue {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  field: string;
}

export interface Document {
  id: string;
  name: string;
  status: DocStatus;
  riskLevel: RiskLevel;
  riskScore: number;
  issuesCount: number;
  updatedAt: string;
  type: string;
  aiSummary: {
    passed: number;
    failed: number;
    warnings: number;
  };
  validations: ValidationField[];
  issues: Issue[];
}

export const documents: Document[] = [
  {
    id: '1',
    name: 'Photo ID Proof',
    status: 'approved',
    riskLevel: 'low',
    riskScore: 12,
    issuesCount: 0,
    updatedAt: '2024-03-15T10:30:00',
    type: 'Identity',
    aiSummary: { passed: 8, failed: 0, warnings: 1 },
    validations: [
      { field: 'Name', declared: 'Priya Sharma', ocr: 'Priya Sharma', status: 'match' },
      { field: 'DOB', declared: '15/06/2001', ocr: '15/06/2001', status: 'match' },
      { field: 'ID Number', declared: 'XXXX-XXXX-4521', ocr: 'XXXX-XXXX-4521', status: 'match' },
    ],
    issues: [],
  },
  {
    id: '2',
    name: 'Permanent Address Proof',
    status: 'approved',
    riskLevel: 'low',
    riskScore: 8,
    issuesCount: 0,
    updatedAt: '2024-03-14T14:20:00',
    type: 'Address',
    aiSummary: { passed: 6, failed: 0, warnings: 0 },
    validations: [
      { field: 'Address', declared: '45, MG Road, Mumbai', ocr: '45, MG Road, Mumbai', status: 'match' },
      { field: 'Pin Code', declared: '400001', ocr: '400001', status: 'match' },
    ],
    issues: [],
  },
  {
    id: '3',
    name: 'Family Income Proof',
    status: 'rejected',
    riskLevel: 'critical',
    riskScore: 89,
    issuesCount: 3,
    updatedAt: '2024-03-15T09:00:00',
    type: 'Financial',
    aiSummary: { passed: 2, failed: 3, warnings: 2 },
    validations: [
      { field: 'Annual Income', declared: '₹2,40,000', ocr: '₹4,80,000', status: 'mismatch' },
      { field: 'Employer', declared: 'ABC Corp', ocr: 'ABC Corporation Ltd', status: 'warning' },
      { field: 'Certificate Date', declared: '01/01/2024', ocr: '01/01/2023', status: 'mismatch' },
    ],
    issues: [
      { id: 'i1', severity: 'HIGH', description: 'Income amount mismatch — declared ₹2.4L vs OCR ₹4.8L', field: 'Annual Income' },
      { id: 'i2', severity: 'HIGH', description: 'Certificate date is from previous year', field: 'Certificate Date' },
      { id: 'i3', severity: 'MEDIUM', description: 'Employer name partial mismatch', field: 'Employer' },
    ],
  },
  {
    id: '4',
    name: 'Marksheet – 10th Board',
    status: 'rejected',
    riskLevel: 'high',
    riskScore: 72,
    issuesCount: 2,
    updatedAt: '2024-03-13T16:45:00',
    type: 'Academic',
    aiSummary: { passed: 5, failed: 2, warnings: 1 },
    validations: [
      { field: 'Total Marks', declared: '465/500', ocr: '425/500', status: 'mismatch' },
      { field: 'Board', declared: 'CBSE', ocr: 'CBSE', status: 'match' },
      { field: 'Year', declared: '2017', ocr: '2017', status: 'match' },
    ],
    issues: [
      { id: 'i4', severity: 'HIGH', description: 'Marks mismatch — Declared 465 vs OCR 425', field: 'Total Marks' },
      { id: 'i5', severity: 'MEDIUM', description: 'Percentage discrepancy detected', field: 'Percentage' },
    ],
  },
  {
    id: '5',
    name: 'Marksheet – 12th Board',
    status: 'approved',
    riskLevel: 'medium',
    riskScore: 35,
    issuesCount: 1,
    updatedAt: '2024-03-12T11:00:00',
    type: 'Academic',
    aiSummary: { passed: 7, failed: 0, warnings: 2 },
    validations: [
      { field: 'Total Marks', declared: '445/500', ocr: '445/500', status: 'match' },
      { field: 'School Name', declared: 'DPS New Delhi', ocr: 'Delhi Public School, New Delhi', status: 'warning' },
    ],
    issues: [
      { id: 'i6', severity: 'LOW', description: 'School name abbreviation vs full name', field: 'School Name' },
    ],
  },
  {
    id: '6',
    name: 'Degree Certificate',
    status: 'approved',
    riskLevel: 'low',
    riskScore: 5,
    issuesCount: 0,
    updatedAt: '2024-03-11T13:30:00',
    type: 'Academic',
    aiSummary: { passed: 10, failed: 0, warnings: 0 },
    validations: [
      { field: 'Degree', declared: 'B.Tech CSE', ocr: 'B.Tech CSE', status: 'match' },
      { field: 'University', declared: 'IIT Delhi', ocr: 'IIT Delhi', status: 'match' },
      { field: 'CGPA', declared: '8.9', ocr: '8.9', status: 'match' },
    ],
    issues: [],
  },
  {
    id: '7',
    name: 'Current Resume',
    status: 'pending',
    riskLevel: 'medium',
    riskScore: 40,
    issuesCount: 1,
    updatedAt: '2024-03-15T08:15:00',
    type: 'Supporting',
    aiSummary: { passed: 4, failed: 1, warnings: 2 },
    validations: [
      { field: 'Experience', declared: '2 years', ocr: '1.5 years', status: 'warning' },
    ],
    issues: [
      { id: 'i7', severity: 'MEDIUM', description: 'Experience duration inconsistency', field: 'Experience' },
    ],
  },
  {
    id: '8',
    name: 'Applicant Photo',
    status: 'approved',
    riskLevel: 'low',
    riskScore: 3,
    issuesCount: 0,
    updatedAt: '2024-03-10T09:00:00',
    type: 'Identity',
    aiSummary: { passed: 4, failed: 0, warnings: 0 },
    validations: [
      { field: 'Face Match', declared: 'Photo', ocr: '98% match', status: 'match' },
    ],
    issues: [],
  },
  {
    id: '9',
    name: 'Academic Transcript',
    status: 'pending',
    riskLevel: 'high',
    riskScore: 65,
    issuesCount: 2,
    updatedAt: '2024-03-15T07:00:00',
    type: 'Academic',
    aiSummary: { passed: 3, failed: 2, warnings: 3 },
    validations: [
      { field: 'CGPA', declared: '8.9', ocr: '7.8', status: 'mismatch' },
      { field: 'Semesters', declared: '8', ocr: '7', status: 'mismatch' },
    ],
    issues: [
      { id: 'i8', severity: 'HIGH', description: 'CGPA mismatch — Declared 8.9 vs OCR 7.8', field: 'CGPA' },
      { id: 'i9', severity: 'MEDIUM', description: 'Semester count mismatch', field: 'Semesters' },
    ],
  },
  {
    id: '10',
    name: 'Enrollment Proof',
    status: 'approved',
    riskLevel: 'low',
    riskScore: 10,
    issuesCount: 0,
    updatedAt: '2024-03-09T15:00:00',
    type: 'Academic',
    aiSummary: { passed: 5, failed: 0, warnings: 1 },
    validations: [
      { field: 'Institution', declared: 'IIT Delhi', ocr: 'IIT Delhi', status: 'match' },
      { field: 'Roll Number', declared: '2021CS1045', ocr: '2021CS1045', status: 'match' },
    ],
    issues: [],
  },
];
