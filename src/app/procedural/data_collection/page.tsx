'use client';
import { PageIDTable } from '@/static_data';
import {GetProceduralComponent} from '../ClientSideComponents';

const DataCollectionPage  = () => {
    return GetProceduralComponent(PageIDTable.Law_Learning_Collection);
}

export default DataCollectionPage;