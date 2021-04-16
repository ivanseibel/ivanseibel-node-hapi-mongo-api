import * as readXlsxFile from 'read-excel-file/node';

const StockSchema = {
    'Centro': {
      prop: 'center',
      type: String,
      required: true
    },
    'Depósito': {
      prop: 'deposit',
      type: String,
      required: true
    },
    'Unid.medida básica': {
      prop: 'unity',
      type: String,
      required: true
    },
    'Utilização livre': {
      prop: 'stock',
      type: Number,
      required: true
    },
  }


const excelToJSON = async (filePath: string) => {
    const data = await readXlsxFile(filePath, { schema: StockSchema });

    return data;
}

export { excelToJSON };
