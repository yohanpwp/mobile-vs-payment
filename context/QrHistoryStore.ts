import { create } from 'zustand';
import { qrBase } from "@/lib/qrdatabase";

export interface qrTableDataProps {
    id: number;
    qrCode: string;
    amounts: string;
    customer: string;
    status: string;
    ref1: string;
    ref2: string;
    ref3: string;
    createdAt: string;
    remark: string;
    scbResponse: {
        [key :string]: string;
    }
  }

interface QrHistoryStore {
    preData: qrTableDataProps[];
    fetchData: (value: any) => Promise<qrTableDataProps[]>;
}

export const useQrHistoryStore = create<QrHistoryStore>( (set) => ({
    preData: [],
    fetchData: async (value) => {
        const result = await qrBase.getHistoryQrCode(value);
        set({ preData: result });
        return result;
    }
}))