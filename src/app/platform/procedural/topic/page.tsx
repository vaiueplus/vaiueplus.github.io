'use client';
import { PageIDTable } from '@/static_data';
import {GetProceduralComponent} from '../ClientSideComponents';

const FieldSelectionPage  = () => {
    return GetProceduralComponent(PageIDTable.Law_Learning_Topic);
}

export default FieldSelectionPage;