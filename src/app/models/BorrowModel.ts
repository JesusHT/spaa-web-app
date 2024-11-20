export interface BorrowModel {
    id_borrow: number;
    id_users: number;
    id_modules: number,
    date_start: string;
    date_end: string | null;
    date_real: string | null;
    status: number;
    applicant: string;
    num_account: number;
    id_career: number;
    semester: string;
    observations: string | null;
    teacher: string;
    reminder_sent: number;
    signature_url: string;
    email: string;
    practice_name: string;
}  