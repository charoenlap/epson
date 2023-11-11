import { encode, decode } from '../../../utils/encryption';
import { connectDb } from '../../../utils/db'; // We'll define this utility later
import _ from  'lodash';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    try {
    const {method,data,params} = decode(req.body)

    if (method=='get') {
        const directoryPath = path.join(process.env.NEXT_PUBLIC_BASEFOLDER, 'public/pdf/', params?.type, params?.model);
        let files = await fs.readdirSync(directoryPath)
        if (params?.series) {
          files = _.filter(files, f => _.startsWith(f, params.series))
        }
        console.log('files', files)
        res.status(200).json({data: encode(files)})
    } else {
        res.status(405).send('Method not allowed')
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error?.message });
  }
}
