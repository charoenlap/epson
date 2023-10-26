import { connectDb } from '../../../utils/db';
import multer from 'multer';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { model, filename } = req.body;

  const filePath = 'public/upload/projector/' + filename;
  const fileBuffer = fs.readFileSync(filePath);

  const iconv = require('iconv-lite');
  let fileContent;

  const errorData = [];
  const informationData = [];
  const connection = await connectDb();
  try {

    const [result_query] = await connection.query(
      'SELECT * FROM es_pt_log WHERE model = ?',
      [model]
    );
    if (result_query.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (fileBuffer[0] === 0xFF && fileBuffer[1] === 0xFE) {
      fileContent = iconv.decode(fileBuffer, 'utf16le');
    } else {
      fileContent = fileBuffer.toString('utf-8');
    }
    const lines = fileContent.split('\n');
    let break_loop = false;
    let no = 0;

    let total_op = '';
    let lamp_on = 0;
    let lamp_off = 0;

    for (let i = 0; i < lines.length - 1; i++) {
      const previousLine = lines[i -1];
      const currentLine = lines[i];
      const nextLine = lines[i + 1];

      if(currentLine.includes("Total Op.Time")){
        const pattern = /"(\d+h \d+m \d+s)"/;
        const match = currentLine.match(pattern);
        if (match) {
          total_op = match[1];
        }
      }
      if(currentLine.includes("Lamp ON Counter")){
        const pattern = /"(\d+)"/;
        const match = currentLine.match(pattern);
        if (match) {
          lamp_on = match[1];
        }
      }
      if(currentLine.includes("Lamp OFF Counter")){
        const pattern = /"(\d+)"/;
        const match = currentLine.match(pattern);
        if (match) {
          lamp_off = match[1];
        }
      }
      for (const error of result_query) {
        const prefixMatch = currentLine.includes(error.error_code_prefix);
        const postfixMatch =
          error.error_code_postfix === '' || nextLine.includes(error.error_code_postfix);
        if (prefixMatch && postfixMatch) {
          no++;
          const pattern = /T (\d+h\d+m\d+s)/;
          const match = previousLine.match(pattern);
          let timeString = '';
          if (match) {
            timeString = match[1];
          }
          errorData.push({
            key: no,
            no: timeString,
            symptom: error.behavior,
            remedy: error.part,
            part: error.part_code,
          });
          break_loop = true;
          break;
        }
      }
      if(break_loop){
        break;
      }
    }
    if(total_op.length){
      informationData.push({key:0,item:'Total Operation Time',currentValue:total_op});
      informationData.push({key:1,item:'Lamp ON Counter',currentValue:lamp_on});
      informationData.push({key:2,item:'Lamp OFF Counter',currentValue:lamp_off});
    }
    res.status(200).json({ uploadedFileName: filename, errorData: errorData, information: informationData });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }finally {
    connection.release(); // Release the connection back to the pool
  }

}
