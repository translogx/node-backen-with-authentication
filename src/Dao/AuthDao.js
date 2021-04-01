import { ReceiptIpFilter } from '@aws-sdk/client-ses';
import DbUtil from '../lib/dbutil';


export default class AuthDao{

    getConnection(){
           return DbUtil.getPostgresConnection();
    }

    async saveNewUser(fname, lname, othname, email, password, userid) {
                
        const client = await this.getConnection();
        try {
            // const client = await this.getConnection();
            await client.query('BEGIN')
            email = email.toUpperCase();
            const queryUser = `select count(1) from zzn_users where email = $1`;
            const rs = await client.query(queryUser, [email]);

            if (rs.rows[0].count > 0){
                return 'The email is already used by a user'
            }else{
                const insertNewUserQuery = `INSERT INTO zzn_users(firstname, lastname, othername, email, password, userid) VALUES($1, $2, $3, $4, $5, $6)`; // returning *`;
                const userResultSet = await client.query(insertNewUserQuery, [fname, lname,othname,email,password, userid] );

                const insertNewUserProfileQuery = `INSERT INTO zzn_user_profile(userid) VALUES ($1)`;
                const res = await client.query(insertNewUserProfileQuery, [userid]);

                console.log(res)

                await client.query('COMMIT');
                return 'SUCCESS'
            }
        } catch (error) {
            console.log(error)
            await client.query('ROLLBACK');
        }finally{
            client.release();
        }
    }

    async getUserByEmail(email){

        const client = await this.getConnection();
        email = email.toUpperCase();
        try {
            const queryUser = `select * from zzn_users where email = $1`;
            const rs = await client.query(queryUser, [email]);
            // console.log(rs)

            if (rs.rowCount > 0){

                //console.log(rs.rows)
                return rs.rows[0]
            }else{
                return null
            }

        } catch (error) {
            console.log(error)
            await client.query('ROLLBACK');
        }finally{
            client.release();
        }
    }

    async getEmailConfirmation(userid){

        const client = await this.getConnection();
        try {
            await client.query('BEGIN')

            const queryUserConfirmation = `select count(1) from zzn_users where userid = $1`;
            let rs = await client.query(queryUserConfirmation, [userid]);

            if (rs.rows[0].count > 0){
                //'USER_EXIST'

            const queryEmailConfirmation = `select userid,email,confirmationstr,sent from zzn_otpobjs where userid = $1`;
            rs = await client.query(queryEmailConfirmation, [userid]);
            
            if (rs.rowCount > 0){

                console.log(rs.rows)
                return rs.rows
            }else{
                return null
            }

            }else{
                throw {'message' :'User does not exist'}
            }

        } catch (error) {
            console.log(error)
            await client.query('ROLLBACK');
        }finally{
            client.release();
        }
    }

    async updateEmailConfirmation(userid){

        const client = await this.getConnection();
        try {
            await client.query('BEGIN')

            const updateUserConfirmation = `update zzn_users set isverified = 'Y' where userid = $1`;
            await client.query(updateUserConfirmation, [userid]);

            const updateEmailConfirmation = `update zzn_otpobjs set recstatus = 'C' where userid = $1`;
            await client.query(updateEmailConfirmation, [userid]);
            
            await client.query('COMMIT');
            return '00'
        } catch (error) {
            console.log(error)
            await client.query('ROLLBACK');
            return null
        }finally{
            client.release();
        }
    }

    async saveEmailValidationSecreteData (userid, email, confirmationString ){

        const client = await this.getConnection();
        try {
            await client.query('BEGIN')
            email = email.toUpperCase()
            // if any otp exist for the user and clear them
            const queryOtp = `select count(1) as count from zzn_otpobjs as o, zzn_users as u 
                            where u.email = o.email and upper(o.email) = $1  and reason ='EMAIL_VERIFICATION'`;
            let rs = await client.query(queryOtp, [email]);

            if (rs.rows[0].count > 0){
                const updateOtpRecord = `update zzn_otpobjs set recstatus = 'C' where upper(email) = $1  and reason ='EMAIL_VERIFICATION'`;
                let rs = await client.query(updateOtpRecord, [email]);
        
                const insertNewOtpRecord = `insert into zzn_otpobjs(userid, email, confirmationstr, reason) values ($1, $2, $3, 'EMAIL_VERIFICATION')`;
                const newOtpRecordValues = [userid, email, confirmationString]
                rs = await client.query(insertNewOtpRecord, newOtpRecordValues);
            }else{
        
                const insertNewOtpRecord = `insert into zzn_otpobjs(userid, email, confirmationstr, reason) values ($1, $2, $3, 'EMAIL_VERIFICATION')`;
                const newOtpRecordValues = [userid, email, confirmationString]
                rs = await client.query(insertNewOtpRecord, newOtpRecordValues);
               // throw {'message' :'invalid user email'}
            }
            
           // console.log(rs)

            await client.query('COMMIT');
            return 'SUCCESS'
        } catch (error) {
            console.log(error)
            await client.query('ROLLBACK');
            return error.message
        }finally{
            client.release();
        }
    }

    async updateEmailValidationSecreteData (email, sendStatus, messageid, response ){

        const client = await this.getConnection();
        try {
            email = email.toUpperCase()
            await client.query('BEGIN')
            const updateOtpRecord = `update zzn_otpobjs 
                                    set sent = $1, messageid = $2, response = $3
                                    where upper(email) = $4 and recstatus = 'O' and reason ='EMAIL_VERIFICATION'`;
            const updateOtpRecordValues = [sendStatus, messageid, response, email]                       
            let rs = await client.query(updateOtpRecord, updateOtpRecordValues);
            //console.log(rs);
            await client.query('COMMIT');
            return
        }catch(error){
            console.log(error)
            await client.query('ROLLBACK');
            return
        }finally{
            client.release();
        }

    }

    async resetUserPassword(userEmail, newPassword){
        
        const client = await this.getConnection();
        userEmail = userEmail.toUpperCase();
        try {
            await client.query('BEGIN')
            const queryUser = `select count(1) from zzn_users where email = $1 `;
            const rs = await client.query(queryUser, [userEmail]);

           // console.log(rs)

            if (rs.rowCount > 0){
                //console.log(rs.rowCount)

               let updatePassword = await client.query(`UPDATE zzn_users SET PASSWORD = $1 WHERE email = $2 RETURNING *`, [newPassword,userEmail] )

                console.log(updatePassword.rows)
                await client.query('COMMIT')
                return rs.rows
            }else{
                return null
            }
        } catch (error) {
            console.log(error)
            await client.query('ROLLBACK');
            return null
        }finally{
            client.release();
        }
        
    }

    async savePasswordResetSecreteData (userId, email, confirmationString ){

        const client = await this.getConnection();
        try {
            let rs 
            await client.query('BEGIN')
            email = email.toUpperCase()
            // if any otp exist for the user and clear them
            const queryOtp = `select count(1) as count from zzn_otpobjs as o, zzn_users as u 
                            where u.email = o.email and upper(o.email) = $1 and reason ='PASSWORD_RESET'`;
            rs = await client.query(queryOtp, [email]);

            if (rs.rowCount > 0){
                const updateOtpRecord = `update zzn_otpobjs set recstatus = 'C' where upper(email) = $1 and reason ='PASSWORD_RESET'`;
                rs = await client.query(updateOtpRecord, [email]);
        
                const insertNewOtpRecord = `insert into zzn_otpobjs(userid, email, confirmationstr, reason) values ($1, $2, $3, 'PASSWORD_RESET')`;
                const newOtpRecordValues = [userId, email, confirmationString]
                rs = await client.query(insertNewOtpRecord, newOtpRecordValues);
            }else{
        
                const insertNewOtpRecord = `insert into zzn_otpobjs(userid, email, confirmationstr, reason) values ($1, $2, $3, 'PASSWORD_RESET')`;
                const newOtpRecordValues = [userId, email, confirmationString]
                rs = await client.query(insertNewOtpRecord, newOtpRecordValues);
               // throw {'message' :'invalid user email'}
            }
            
            console.log(rs)

            await client.query('COMMIT');
            return 'SUCCESS'
        } catch (error) {
            console.log(error)
            await client.query('ROLLBACK');
            return error.message
        }finally{
            client.release();
        }
    }

    async updatePasswordResetSecreteData (email, sendStatus, messageid, response ){

        const client = await this.getConnection();
        try {
            email = email.toUpperCase()
            await client.query('BEGIN')
            const updateOtpRecord = `update zzn_otpobjs 
                                    set sent = $1, messageid = $2, response = $3
                                    where email = $4 and recstatus = 'O' and reason ='PASSWORD_RESET'`;
            const updateOtpRecordValues = [sendStatus, messageid, response, email]                       
            let rs = await client.query(updateOtpRecord, updateOtpRecordValues);
            //console.log(rs);
            await client.query('COMMIT');
            return
        }catch(error){
            console.log(error)
            await client.query('ROLLBACK');
            return
        }finally{
            client.release();
        }

    }

    

}
