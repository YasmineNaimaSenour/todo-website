export interface IPagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
}

export interface IResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        details?: any;
    };
    pagination?: IPagination;
} 