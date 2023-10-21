'use client';
import { PageIDTable } from '@/static_data';
import {GetProceduralComponent} from '../ClientSideComponents';

const WorkPage  = () => {
    return GetProceduralComponent(PageIDTable.Law_Learning_Presentation);
}

export default WorkPage;