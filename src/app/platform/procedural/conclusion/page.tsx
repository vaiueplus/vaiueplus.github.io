'use client';
import { PageIDTable } from '@/static_data';
import {GetProceduralComponent} from '../ClientSideComponents';

const ReportPage  = () => {
    return GetProceduralComponent(PageIDTable.Law_Learning_Conclusion);
}

export default ReportPage;