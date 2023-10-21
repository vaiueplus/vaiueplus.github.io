'use client';
import { PageIDTable } from '@/static_data';
import {GetProceduralComponent} from '../ClientSideComponents';

const NotePage  = () => {
    return GetProceduralComponent(PageIDTable.Law_Learning_Process);
}

export default NotePage;