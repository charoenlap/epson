import { encode, decode } from '../../../utils/encryption';
import { connectDb } from '../../../utils/db'; // We'll define this utility later
import _ from 'lodash';

export default async function handler(req, res) {
  const connection = await connectDb();
  try {
    const {method,data,params} = decode(req.body)
    if (method=='get') {
      let where = 'WHERE u.del=0 ';
      if (_.size(params)>0) {
        where = 'WHERE u.del=0 AND ';
        where += _.join(_.map(params, (v,k) => `${k}=?`), ' AND ')+' ';
      }
      let sql = 'SELECT u.id as id,u.username,u.status,GROUP_CONCAT(r.id) as roles_id,GROUP_CONCAT(r.name) as roles_name FROM ep_users u ';
      sql += 'LEFT JOIN ep_user_of_role ur on u.id = ur.user_id ';
      sql += 'LEFT JOIN ep_roles r on ur.role_id = r.id ';
      sql += where
      sql += 'GROUP BY u.id ';
      console.log(sql, _.values(params))
      const [result] = await connection.query(sql, (_.size(params)>0?_.values(params):null), (err,results) => {
        console.error(err);
        console.log(results);
      })


      res.status(200).json({data:encode(result)});
    } else if (method=='post') {
      let col = _.join(_.keys(data), ',');
      console.log(_.values(data));
      let sql = `INSERT INTO ep_users (${col}) VALUES (${_.map(_.values(data), v => '?')})`;
      console.log(sql);
      const [result] = await connection.query(
        sql,
        _.values(data),
        function(err, results) {
          console.error(err);
          console.log(results)
        }
      );
      connection.end();
      res.status(200).json({data: encode(result)})
    } else if (method=='put') {
      console.log(params,data)
      let where = _.join(_.map(params, (v,k) => `${k}=${v}`), ' AND ');
      let setVal = _.join(_.map(data, (v,k) => `${k}='${v}'`), ', ');
      let sql = `UPDATE ep_users SET ${setVal} WHERE ${where}`;
      console.log(sql);
      const [result] = await connection.query(
        sql,
        _.values(data),
        function(err, results) {
          console.error(err);
          console.log(results)
        }
      );
      connection.end();
      res.status(200).json({data: encode(result)})
    } else if (method=='delete') {
      let where = _.join(_.map(params, (v,k) => `${k}='${v}'`), ' AND ')
      let sql = `UPDATE ep_users SET del=1, updated=${data?.updated_at} WHERE ${where}`;
      console.log(sql);
      const [result] = await connection.query(
        sql,
        _.values(data),
        function(err, results) {
          console.error(err);
          console.log(results)
        }
      );
      connection.end();
      res.status(200).json({data: encode(result)})
    } else {
      res.status(405).send('Method not allowed')
    }
  } catch (error) {
    console.error('Error:', error);
    // return res.status(500).json({ error: 'Server error' });
  }finally {
    connection.end();; // Release the connection back to the pool
  }
}
