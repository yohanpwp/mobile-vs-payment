export interface QrGeneratorProps {
    customerName: string,
    amounts: string,
    remark?: string,
}

export interface QrReferenceProps extends QrGeneratorProps {
    qrType: string,
    ppType: string,
    ppId: string,
    expiryDate: string,
    numberOfTimes: number,
    ref1: string,
    ref2: string,
    ref3: string,
    token: string
}