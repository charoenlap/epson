import { connectDb } from '../../../utils/db'; // We'll define this utility later
import fs from 'fs';
import _ from 'lodash';
import { encode } from '../../../utils/encryption';

export default async function handler(req, res) {

  try {
    const connection = await connectDb();

    const tableName = 'ep_permissions';
    const outputPath = 'D:/fsoftpro/epson/output/export.csv'
    const [columns] = await connection.query(`SHOW COLUMNS FROM ${tableName}`);
    const columnNames = columns.map((column) => `${column.Field}`).join(',');

    const [rows] = await connection.query(`SELECT ${columnNames} FROM ${tableName}`);
    
    let csvContent = columnNames + '\n';
    _.map(rows, row => {
        console.log('col', row);
        const values = _.map(_.values(row), value => {
            if (_.isNull(value)) return '';
            return typeof value === 'string' && _.join(value, ',') ? `"${value}"` : value;
        })
        csvContent += `${values.join(',')}\n`;
    })

    fs.writeFileSync(outputPath, csvContent, { flag: 'w' });


    res.status(200).json({ data: encode('Table data dumped successfully to CSV') });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
