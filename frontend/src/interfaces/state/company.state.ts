import { Status } from './base-req.state';
import { ICompany } from '../models/ICompany';

export default interface CompanyState {
    companies: {
        data: Array<ICompany>;
        status: Status;       
    };
    company: {
        data: ICompany | null;
        status: Status;
    };
    status: Status;
    error: undefined | string;
}