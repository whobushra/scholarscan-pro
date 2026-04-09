export interface Applicant {
  id: string;
  applicationNo: string;
  name: string;
  level: 'UG' | 'PG' | 'Diploma';
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  documentsCount: number;
  issuesCount: number;
  submittedAt: string;
  institution: string;
  isRework: boolean;
}

export const applicants: Applicant[] = [
  {
    id: 'a1',
    applicationNo: 'RFSCH250900019751',
    name: 'Margani Rohith',
    level: 'PG',
    status: 'pending',
    riskLevel: 'high',
    riskScore: 72,
    documentsCount: 10,
    issuesCount: 3,
    submittedAt: '2024-03-15T10:30:00',
    institution: 'IIT Hyderabad',
    isRework: false,
  },
  {
    id: 'a2',
    applicationNo: 'RFSCH250900019752',
    name: 'Priya Sharma',
    level: 'UG',
    status: 'approved',
    riskLevel: 'low',
    riskScore: 12,
    documentsCount: 8,
    issuesCount: 0,
    submittedAt: '2024-03-14T14:20:00',
    institution: 'IIT Delhi',
    isRework: false,
  },
  {
    id: 'a3',
    applicationNo: 'RFSCH250900019753',
    name: 'Amit Patel',
    level: 'PG',
    status: 'rejected',
    riskLevel: 'critical',
    riskScore: 89,
    documentsCount: 9,
    issuesCount: 5,
    submittedAt: '2024-03-13T16:45:00',
    institution: 'NIT Trichy',
    isRework: true,
  },
  {
    id: 'a4',
    applicationNo: 'RFSCH250900019754',
    name: 'Sneha Reddy',
    level: 'UG',
    status: 'in-review',
    riskLevel: 'medium',
    riskScore: 45,
    documentsCount: 7,
    issuesCount: 2,
    submittedAt: '2024-03-12T11:00:00',
    institution: 'BITS Pilani',
    isRework: false,
  },
  {
    id: 'a5',
    applicationNo: 'RFSCH250900019755',
    name: 'Rahul Kumar',
    level: 'Diploma',
    status: 'pending',
    riskLevel: 'low',
    riskScore: 15,
    documentsCount: 6,
    issuesCount: 0,
    submittedAt: '2024-03-11T09:00:00',
    institution: 'Govt Polytechnic Mumbai',
    isRework: false,
  },
  {
    id: 'a6',
    applicationNo: 'RFSCH250900019756',
    name: 'Kavita Singh',
    level: 'PG',
    status: 'pending',
    riskLevel: 'high',
    riskScore: 68,
    documentsCount: 10,
    issuesCount: 4,
    submittedAt: '2024-03-10T15:30:00',
    institution: 'IISc Bangalore',
    isRework: false,
  },
  {
    id: 'a7',
    applicationNo: 'RFSCH250900019757',
    name: 'Deepak Verma',
    level: 'UG',
    status: 'approved',
    riskLevel: 'low',
    riskScore: 8,
    documentsCount: 8,
    issuesCount: 0,
    submittedAt: '2024-03-09T12:00:00',
    institution: 'Delhi University',
    isRework: false,
  },
  {
    id: 'a8',
    applicationNo: 'RFSCH250900019758',
    name: 'Ananya Gupta',
    level: 'UG',
    status: 'in-review',
    riskLevel: 'medium',
    riskScore: 38,
    documentsCount: 7,
    issuesCount: 1,
    submittedAt: '2024-03-08T14:00:00',
    institution: 'Christ University',
    isRework: true,
  },
];
